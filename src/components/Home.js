import React from "react";
import { Container } from "react-bootstrap";
import { MyContext } from "./MyContext";

class Home extends React.Component {
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <Container style={{ backgroundColor: "#1D1D1D", color: "white" }}>
            {context.name === "" ? (
              <h2>Welcome to home page</h2>
            ) : (
              <h2>Welcome {context.name}!</h2>
            )}

            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Suscipit, quaerat! Impedit eos repellat praesentium cupiditate
              fuga optio repudiandae accusantium ullam autem, consequuntur
              aliquid quidem pariatur ad deleniti vel a fugiat? Saepe provident
              eos soluta corrupti ducimus, libero modi cupiditate error
              recusandae vero nemo quo sed alias consequuntur, eum esse ex
              doloremque vitae, ab illo quisquam rerum tempore nulla. Aperiam,
              eum. Nam saepe labore, hic non blanditiis impedit? Hic, porro
              aspernatur quae magnam, qui, quo odit officiis repellendus eos
              illum quis esse magni ipsa necessitatibus aliquid. Eius sint modi
              recusandae dolor. Nihil eveniet culpa deserunt facilis optio saepe
              libero quasi, quis cumque tempore est, vero a consectetur
              molestiae, dignissimos hic perferendis esse voluptate sint
              inventore ipsum praesentium similique et? Consequatur, obcaecati.
              Suscipit molestias sit sapiente quo eaque dolore, cumque alias
              quasi iusto quibusdam expedita incidunt. Aliquam porro, at
              excepturi, magnam culpa, iure ipsam atque ad quisquam debitis
              deleniti officia quos ex. Autem voluptatem, error quas id
              distinctio adipisci ducimus quaerat ullam sunt numquam placeat
              doloribus aliquam? Modi autem voluptate ex consectetur doloribus
              rem nihil. Beatae molestiae odit eius impedit vitae soluta!
              Aperiam sit officia consequuntur labore vel eligendi cumque
              dignissimos ipsa enim! Esse debitis, maiores nam voluptate iste
              corporis omnis inventore dolores, quo doloribus velit nesciunt
              amet fugiat! Laudantium, natus doloremque? Repellendus dicta
              dolores inventore. Eum repudiandae blanditiis ex, beatae
              doloremque recusandae ab consequatur provident aut facilis quo,
              ipsum natus, sed itaque modi fuga commodi culpa! Et quisquam id
              eaque at? Deleniti, consectetur doloremque quos voluptates quis
              quidem nemo, facilis deserunt itaque inventore nobis omnis.
              Voluptate suscipit veritatis necessitatibus inventore laborum?
              Nulla corrupti aperiam excepturi eos, rem natus ducimus temporibus
              inventore. Expedita laborum ducimus aperiam officiis nulla,
              quisquam nemo! Assumenda corporis magni quibusdam tenetur, natus
              inventore temporibus veritatis officia veniam quos unde soluta
              provident itaque. Qui dolore ad corporis ipsam laborum! Commodi
              nostrum consectetur laboriosam ipsam assumenda doloremque ut
              laborum, aut consequatur est sequi ea sapiente impedit
              reprehenderit, nihil veritatis perferendis! Assumenda illo
              reiciendis dolor quae quis nostrum alias amet tempora! Suscipit
              aliquam asperiores commodi repudiandae tempore fugiat tenetur amet
              deleniti. Qui corporis dicta voluptatum eligendi ab est possimus
              corrupti culpa illo minus laborum, nihil praesentium esse aperiam!
              Culpa, repellendus tempore. Repellat perferendis voluptas
              molestias in veritatis blanditiis consequatur corporis ea officia
              necessitatibus incidunt exercitationem fugit suscipit cumque
              corrupti dolor praesentium asperiores, facere harum? Quisquam,
              deserunt autem aliquid vitae rem reprehenderit? Eligendi sit nisi
              reiciendis ipsa similique at, facilis odio non voluptas sunt, quae
              molestias hic autem est vitae sed veniam corrupti. Ut rerum ab
              aliquid cumque doloribus, id deserunt dicta. Odio officiis, velit
              similique perferendis odit esse, explicabo temporibus iste dicta,
              quod cum? Maiores alias exercitationem, ex minima asperiores magni
              itaque nulla corrupti quisquam! Necessitatibus animi iure quisquam
              ipsam harum. Labore magni ullam temporibus inventore dolorum!
              Blanditiis numquam nostrum veniam sapiente, eveniet iusto
              molestiae quaerat ducimus natus cumque quae necessitatibus quis
              officia a facere? Laborum eaque alias ipsam fugit sed. Reiciendis
              quasi earum deserunt animi porro molestias dolore! Ex atque soluta
              velit architecto ullam nostrum totam suscipit assumenda natus, sed
              aspernatur omnis ipsam illum illo laborum sit nulla veritatis
              adipisci! Quas doloribus officiis assumenda esse. Qui deserunt
              temporibus perferendis aspernatur eligendi quam voluptate officiis
              iure blanditiis sapiente autem, ipsum hic error. Quisquam mollitia
              fugiat dolores illum amet neque consequatur laudantium? Aliquid
              consectetur esse reprehenderit sequi vero? Ratione neque beatae in
              voluptatum nisi, consequatur odio, odit labore nostrum magnam quos
              voluptas illum. Aliquam magni eum incidunt molestias praesentium
              magnam, nihil quidem? Temporibus veniam quo rem, modi adipisci at
              dolores fuga architecto voluptas dolore recusandae, esse nostrum
              enim dicta cupiditate nobis natus id voluptates, ad amet! Cum
              laudantium placeat laboriosam suscipit quibusdam.
            </p>
          </Container>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Home;
