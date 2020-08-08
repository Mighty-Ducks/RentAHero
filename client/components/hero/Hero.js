import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchHero, createItem } from '../../store/actions';
import './hero.scss';

class Hero extends Component {
  state = {
    total: 0,
    actId: '',
    actName: '',
    actPrice: '',
  };

  componentDidMount() {
    const {
      load,
      match: {
        params: { id },
      },
    } = this.props;

    load(id);
  }

  setFieldToState = (ev) => {
    const {
      target: { value, checked },
    } = ev;
    const { total } = this.state;
    const updatedTotal = checked ? total + +value : total - +value;

    this.setState({
      total: updatedTotal,
    });
  };

  render() {
    const {
      hero: { id, name, imgURL, description, acts = [] },
      addToCart,
    } = this.props;

    const { total, actId, actName, actPrice } = this.state;

    return (
      <div className="px-3 hero-view container-xl">
        <h1>
          Hero:&nbsp;
          <strong>{name}</strong>
        </h1>
        <div className="card mb-3">
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
                              type="checkbox"
                              value={act.price}
                              id={`${act.id}`}
                              onChange={(ev) => {
                                this.setState({
                                  actId: ev.target.id,
                                  actName: act.name,
                                  actPrice: act.price,
                                });
                                this.setFieldToState(ev);
                              }}
                            />
                            {act.name}
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
                            total
                          );
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: (id) => {
      dispatch(fetchHero(id));
    },
    addToCart: (ev, id, name, imgURL, actId, actName, actPrice, total) => {
      ev.preventDefault();
      const item = {
        heroId: id,
        heroName: name,
        heroImgURL: imgURL,
        actId,
        actName,
        price: actPrice,
        total,
      };

      dispatch(createItem(item));
    },
  };
};

Hero.defaultProps = {
  match: {},
};

Hero.propTypes = {
  hero: PropTypes.oneOfType([PropTypes.object]).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  load: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Hero);
