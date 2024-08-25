import Products from "./Products";

const Home = () => {
  return (
    <div className="hero">
    <div className="card text-black border-0" style={{ backgroundColor: '#f9e6e6' }}>
      <img src= "..." className="card-img" alt="" height="550px" />
      <div className="card-img-overlay d-flex flex-column justify-content-center" style={{ backgroundColor: 'rgba(249, 230, 230, 0.7)' }}>
        <div className="container">
          <h5 className="card-title display-3 fw-bolder mb-0">New Arrival for Summer</h5>
          <p className="card-text lead fs-2">
          Be the first to shop our new summer arrivals. Fresh off the runway and ready to wear. Your fall wardrobe starts here.
          </p>
        </div>
      </div>
    </div>
    <Products/>
  </div>
  );
};
export default Home;
