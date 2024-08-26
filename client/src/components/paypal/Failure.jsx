const Failure = () => {
  return (
    <>
       <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="col-md-6">
        <div className="card text-center shadow-lg mb-5 border-danger">
          <div className="card-body p-5">
            <i
              className="fa fa-times-circle text-danger"
              style={{ fontSize: "70px" }}
            ></i>
            <h2 className="card-title mt-4 mb-4">
              Your payment failed
            </h2>
            <p className="card-text">
              Try again later
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Failure;
