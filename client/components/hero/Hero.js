import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment-timezone';

import Popup from '../popup/Popup';
import UpdateHeroForm from '../updateHeroForm/UpdateHeroForm';
import EditButton from '../buttons/EditButton';
import { fetchHero, createItem, fetchEvents } from '../../store/actions';
import './hero.scss';

class Hero extends Component {
  state = {
    total: 0,
    actId: '',
    actName: '',
    actPrice: '',
    date: moment(),
    time: '',
  };

  componentDidMount() {
    const {
      load,
      loadEvents,
      match: {
        params: { id },
      },
    } = this.props;

    load(id);
    loadEvents(id);
  }

  setFieldToState = ({ target }) => {
    const { value, id } = target;
    const actName = target.getAttribute('data-act');

    this.setState({
      total: value,
      actId: id,
      actName,
      actPrice: value,
    });
  };

  resetState() {
    this.setState({
      total: 0,
      actId: '',
      actName: '',
      actPrice: '',
      date: moment(),
      time: '',
    });
  }

  render() {
    const {
      hero: { id, name, imgURL, description, acts = [] },
      addToCart,
      loggedIn,
      isAdmin,
      events,
    } = this.props;

    const { total, actId, actName, actPrice, date, time } = this.state;

    const hours = [];
    for (let i = 9; i < 22; i++) {
      hours.push(i < 10 ? `0${i}:00` : `${i}:00`);
    }

    return (
      <div className="px-3 hero-view container-xl">
        <h1>
          Hero:&nbsp;
          <strong>{name}</strong>
        </h1>
        <div className="card mb-3">
          {loggedIn && isAdmin && (
            <Popup
              title="Edit Hero"
              BodyModal={UpdateHeroForm}
              ButtonModal={EditButton}
              data={{ id, imgURL, name, description, acts }}
            />
          )}
          <div className="row no-gutters">
            <div className="col-md-4">
              {imgURL && <img src={imgURL} className="card-img" alt="" />}
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <div className="card bg-light mb-3">
                  <div className="card-body">{description}</div>
                </div>
                <form>
                  <h6>Please choose acts you want to book</h6>
                  <div className="mb-3 pb-3 border-bottom">
                    {acts.map((act) => {
                      return (
                        <div key={act.id} className="form-check">
                          <label
                            className="form-check-label d-flex justify-content-between"
                            htmlFor={`${act.id}`}
                          >
                            <input
                              className="form-check-input"
                              data-act={act.name}
                              name="acts"
                              type="radio"
                              value={act.price}
                              id={act.id}
                              onChange={this.setFieldToState}
                            />
                            {`${act.name} (1 hour)`}
                            <span className="space-dots"></span>
                            <div>
                              <strong>{act.price}</strong>
                              <span className="text-muted">&nbsp;$</span>
                            </div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label className="label-full" htmlFor="date">
                        Date
                        <input
                          className="form-control"
                          type="date"
                          value={date}
                          id="date"
                          onChange={(ev) => {
                            this.setState({ date: ev.target.value });
                          }}
                        />
                      </label>
                    </div>
                    <div className="form-group col-md-6">
                      <label className="label-full" htmlFor="time">
                        Time
                        <select
                          className="form-control"
                          name="time"
                          id="time"
                          value={time}
                          onChange={(ev) => {
                            this.setState({ time: ev.target.value });
                          }}
                        >
                          <option>-- Choose time --</option>
                          {hours.map((hour) => {
                            const eventsByDate = events.filter(
                              (ev) => date === ev.datetime.substring(0, 10)
                            );
                            const taken = eventsByDate.filter((ev) => {
                              const evTime = moment(ev.datetime).hours();
                              const finalTime =
                                evTime < 10 ? `0${evTime}:00` : `${evTime}:00`;
                              return hour === finalTime;
                            });
                            return (
                              <option
                                key={hour}
                                disabled={taken.length > 0 ? true : null}
                                value={hour}
                              >
                                {hour}
                              </option>
                            );
                          })}
                        </select>
                      </label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="total">
                      Total:&nbsp;
                      <strong className="h1">
                        {total}
                        &nbsp;$
                      </strong>
                    </div>
                    <p className="card-text">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(ev) => {
                          addToCart(
                            ev,
                            id,
                            name,
                            imgURL,
                            actId,
                            actName,
                            actPrice,
                            total,
                            moment
                              .tz(
                                date + time,
                                'YYYY MM DD hh:mm',
                                'America/New_York'
                              )
                              .format()
                          );
                          this.resetState();
                        }}
                      >
                        Book a hero
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hero: state.heroes.hero,
    loggedIn: state.users.loggedIn,
    isAdmin: state.users.user.admin,
    events: state.event.events,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: (id) => {
      dispatch(fetchHero(id));
    },
    loadEvents: (id) => {
      dispatch(fetchEvents(id));
    },
    addToCart: async (
      ev,
      id,
      name,
      imgURL,
      actId,
      actName,
      actPrice,
      total,
      datetime
    ) => {
      ev.preventDefault();
      const item = {
        heroId: id,
        heroName: name,
        heroImgURL: imgURL,
        actId,
        actName,
        datetime,
        price: actPrice,
        total,
      };

      await dispatch(createItem(item));
    },
  };
};

Hero.defaultProps = {
  match: {},
  loggedIn: false,
  isAdmin: false,
};

Hero.propTypes = {
  hero: PropTypes.oneOfType([PropTypes.object]).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  load: PropTypes.func.isRequired,
  loadEvents: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Hero);
