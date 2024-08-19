import PageNav from "../components/PageNav.jsx";

import styles from "./Product.module.css";

export default function Pricing() {
    return(
        <main className={styles.product}>
            <PageNav/>

            <section>
                <div>
                <h2>Simple pricing<br/>Just $9/month</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit pariatur non quasi et enim obcaecati voluptas cum consequuntur iste, odio sequi, voluptatibus doloremque cupiditate corporis, fuga consequatur provident assumenda nemo.</p>
                </div>
                <img src="img-2.jpg" alt="city"/>
            </section>
        </main>
    )
}