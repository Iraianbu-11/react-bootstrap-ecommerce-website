const Success = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="col-md-6">
        <div className="card text-center shadow-lg mb-5 border-success">
          <div className="card-body p-5">
            <i
              className="fa fa-check-circle text-success"
              style={{ fontSize: "70px" }}
            ></i>
            <h2 className="card-title mt-4 mb-4">
              Your payment was successful
            </h2>
            <p className="card-text">
              Thank you for your shopping with Shopifyyy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
