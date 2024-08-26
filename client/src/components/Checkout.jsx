import { useSelector } from "react-redux";
import axios from "axios";
const Checkout = () => {
  const state = useSelector((state) => state.handleCart);
  var total = 0;
  const itemList = (item) => {
    total = total + (item.price * item.qty);
    return (
      <li className="list-group-item d-flex justify-content-between lh-sm">
        <div>
          <h6 className="my-0">{item.title} ({item.qty})</h6>
        </div>
        <span className="text-muted">${item.price}</span>
      </li>
    );
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const APP_URL = import.meta.env.VITE_APP_URL;
    console.log("APP URL " + APP_URL);
    let res = await axios.post(`${APP_URL}/payment`, {total});
    console.log(res);
    if(res && res.data){
      let link = res.data.links[1].href;
      window.location.href = link;
    }
  }

  return (
    <>
      <div className="container my-5">
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">
                {state.length}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {state.map(itemList)}

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${total}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" noValidate="" onClick={handleSubmit}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder=""
                    value=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    value=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">@</span>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Username"
                      required=""
                    />
                    <div className="invalid-feedback">
                      Your username is required.
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email{" "}
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address htmlFor shipping updates.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    required=""
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>

                <div className="col-md-5">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <select className="form-select" id="country" required="">
                    <option>India</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <select className="form-select" id="state" required="">
                    <option>Tamilnadu</option>
                    <option>Kerala</option>
                    <option>Karnataka</option>
                    <option>Andhra Pradesh</option>
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">
                    Zip
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>

              <hr className="my-4" />

              <div className="container">
                <div className="row">
                  <button
                    className="btn btn-outline-primary mb-5 w-25 mx-auto"
                    type="submit"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
