import PageNav from "../components/PageNav.jsx";

import styles from "./Product.module.css"

export default function Product() {
    return(
        <main className={styles.product}>
            <PageNav />

            <section>
                <img src="img-1.jpg" alt="dogs>cats" />

                <div>
                    <h2>About WorldWide</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis perferendis fugiat voluptatem ut maxime saepe accusamus repellendus earum atque consectetur, exercitationem sed. Illo odio incidunt necessitatibus saepe, harum quibusdam eaque.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, placeat repudiandae. Natus, reprehenderit temporibus quidem tempora voluptate dignissimos aliquid ut, necessitatibus amet libero animi, cumque ipsam quis officiis labore nisi?</p>
                </div>
                
            </section>
        </main>
    )
}