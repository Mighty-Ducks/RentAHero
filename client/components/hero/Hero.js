import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchHero } from '../../store/actions';
import './hero.scss';

class Hero extends Component {
  state = {
    total: 0,
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

  setFieldToState = ({ target: { value, checked } }) => {
    const { total } = this.state;
    const updatedTotal = checked ? total + +value : total - +value;

    this.setState({ total: updatedTotal });
  };

  render() {
    const {
      hero: { name, imgURL, description, acts = [] },
    } = this.props;

    const { total } = this.state;

    return (
      <div className="px-3 hero-view">
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
                            htmlFor={`check-${act.id}`}
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={act.price}
                              id={`check-${act.id}`}
                              onChange={this.setFieldToState}
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
                      <a
                        href="https://calendly.com/rentaheroinfo/rent-a-batman?month=2020-07"
                        className="btn btn-primary"
                      >
                        Book a hero
                      </a>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Hero);
