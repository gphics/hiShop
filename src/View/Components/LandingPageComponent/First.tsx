import { Link } from "react-router-dom"
import Hero from "../../../assets/Static/PNG/Ecommerce.png"
import viewUtils from "../../Utils"
function First() {
  
  return (
    <div className="first_landing_page_component">
      <article className="intro">
        <header className="intro_header">
          <h2> Swift Transaction </h2>
        </header>

        <p>
          {" "}
          Buy and sell in the most convinient way you have never imagined with
          your{" "}
          <Link to="https://hipay.netlify.app/" target="_blank">
            {" "}
            hiPay
          </Link>{" "}
          account.{" "}
        </p>
        <div className="link_holder">
          <Link className="article_link" to="/home/register">
            get started
          </Link>
        </div>
      </article>
      <img src={Hero} alt="ecommerce" />
    </div>
  );
}

export default First