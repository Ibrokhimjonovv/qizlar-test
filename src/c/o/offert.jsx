import React, { useContext, useState } from "react";
import "./offert.scss";
import { AppContext } from "../../context";

const Offert = () => {
  const { errors, isCheck, setIsCheck } = useContext(AppContext);

  const [isChecked, setIsChecked] = useState(false);

  return (
    <div id="offert">
      <div
        className={`offert-popup-shape ${isChecked ? "active" : ""}`}
        onClick={() => {
          setIsChecked(false);
        }}
      ></div>
      <div className={`offert-popup ${isChecked ? "active" : ""}`}>
        <div className="popup-inner">
          <h2>Offerta sarlavhasi</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius natus
            neque ad nisi cum obcaecati labore soluta enim dolore tempora, nam
            nesciunt rem similique facere ratione maiores id excepturi facilis
            magni architecto esse voluptas voluptatum quisquam. Esse quam
            sapiente doloremque possimus reiciendis consequatur repudiandae et
            neque iste reprehenderit eligendi assumenda quasi doloribus maxime
            tempora magni, ut unde maiores. Illum magnam ut quisquam, repellat
            pariatur mollitia hic similique! Veritatis, voluptates at blanditiis
            adipisci ullam, sapiente labore nisi mollitia ipsa culpa sunt
            nostrum voluptatum officia debitis, libero esse id dolore accusamus
            cum expedita consequatur incidunt! Totam et error soluta, possimus
            praesentium asperiores doloribus quos accusantium doloremque
            ratione! In voluptatibus dicta architecto? Officia aperiam, totam
            autem, eius repellendus accusamus voluptates ex hic nobis fugiat,
            ipsa labore voluptatibus facilis mollitia quidem aliquid. Voluptate
            labore deleniti provident architecto modi. Optio ratione doloribus
            neque dolorum nobis deserunt non numquam tempore sed aperiam vero
            minima eum, veritatis praesentium dicta minus est laudantium
            repellendus illo ea officiis qui? Asperiores qui nam impedit beatae
            aperiam quod laboriosam voluptate rerum sit ipsam consequatur, eos
            cupiditate vitae nisi quas nesciunt fugiat porro. Soluta magnam quas
            accusamus provident, ipsa iure aspernatur corrupti amet illum beatae
            odio quasi quod quaerat voluptatibus necessitatibus error? Illo ut
            vero velit, pariatur provident dignissimos beatae nulla itaque
            reprehenderit nostrum, corporis sequi! Porro cupiditate voluptate
            nihil iure dolor veritatis eum nisi aut vel laudantium illum nemo
            provident, magni excepturi alias? Sit iure voluptas tempore amet,
            veniam sed. Laboriosam quo at dolores quos cumque corrupti nihil.
            Laborum eos reiciendis repellat ipsum hic, maxime facilis ea
            asperiores possimus? Vitae fugiat at veniam quisquam ipsam dicta
            voluptas, fugit suscipit ex aut, nobis similique ad deleniti culpa,
            ut obcaecati voluptatibus dignissimos quas perspiciatis beatae illum
            voluptatem nisi! Quia, quas. Quia ad corrupti quos sint officiis
            optio inventore non consequuntur, atque ratione beatae nostrum
            quisquam veritatis ducimus dolore a mollitia ullam. Veniam rerum
            recusandae cupiditate voluptas aliquid. Unde corrupti modi
            laudantium tenetur. Quibusdam vel itaque mollitia molestias deserunt
            molestiae architecto explicabo rem eaque porro ea aperiam dolorem
            deleniti earum eveniet distinctio similique quis odio et, totam sed
            velit corporis. Reiciendis fugit nesciunt in qui provident natus
            doloremque? Eos tenetur maiores, doloremque voluptas eum excepturi
            possimus facilis similique dicta porro, quas modi, debitis sit.
            Tempore sequi libero laudantium vero voluptas? Dolor, nemo animi?
            Unde ipsa placeat, eos enim explicabo deleniti ducimus? Eius
            accusantium ullam cum labore laudantium ratione atque culpa! Ad
            corrupti architecto aut non mollitia harum fugit aliquid, nesciunt
            asperiores quas. Excepturi ad quis nemo veniam ipsam rerum repellat
            omnis voluptatum atque quos ullam impedit cumque possimus in,
            adipisci, laborum fugit harum error! Cumque voluptatum, nemo aliquid
            architecto aut vero necessitatibus deleniti sapiente harum
            voluptates alias iure. Asperiores fugiat officiis tempora voluptatem
            quo expedita accusamus vero dolores repudiandae ipsa aspernatur
            nihil distinctio nemo consequatur reiciendis minus, fuga sapiente!
            Assumenda, totam. Temporibus dolorem perferendis unde dolore magni
            laboriosam obcaecati esse, ad similique. Esse quasi fugiat amet a
            sit laborum molestiae asperiores, quas ipsa sequi quod laboriosam
            voluptatum optio quidem. Iusto placeat quo animi eius?
          </p>
        </div>

        <div className="tool">
            <div className="line"></div>
          <label
            for="checkbox-2"
            class="form-control"
            onClick={() => {
              setIsChecked(false);
              setIsCheck(!isCheck);
            }}
          >
            Ommaviy oferta shartlariga rozilik
            <input
              type="checkbox"
              name="checkbox-2"
              id="checkbox-2"
              value={isCheck}
              checked={isCheck}
              disabled
            />
            <span class="custom-checkbox"></span>
          </label>
        </div>
      </div>
      <div className="input-row">
        <label
          for="checkbox-1"
          class="form-control cont-1"
          onClick={() => setIsChecked(true)}
        >
          Ommaviy oferta shartlariga rozilik
          <input
            type="checkbox"
            name="checkbox-1"
            id="checkbox-1"
            value={isCheck}
            disabled={!isCheck}
            checked={isCheck}
          />
          <span class="custom-checkbox box-1"></span>
        </label>
        <span className="error" style={{fontSize: '15px'}}>{errors.offert}</span>
      </div>
    </div>
  );
};

export default Offert;
