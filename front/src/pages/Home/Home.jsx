import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import './home.css';

const Home = () => {

  const [dados, setDados] = useState([]);
  const [id, setId] = useState('');

  const getDados = async () => {
    const response = await fetch("http://localhost:3000/", {
      method: "GET",
      headers: {
        'Content-Type': "application/json"
      }
    })

    const data = await response.json()
    setDados(data);
  };




  useEffect(() => {
    getDados();
  }, [dados]);

  if (id) {
    const deletarUser = async () => {
      const response = await fetch(`http://localhost:3000/deletarUser/:${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      });

      // eslint-disable-next-line no-unused-vars
      const data = await response.json();
    }
    deletarUser();
  } else {
    <p>error</p>
  }



  return (
    <div>
      <h1>Usuários</h1>

      <table>

        <thead>
          <tr>
            <th scope="col">nome</th>
            <th scope="col">email</th>
            <th scope="col">cpf</th>
            <th scope="col">sexo</th>
            <th scope="col">estado</th>
            <th scope="col">cidade</th>
            <th scope="col">Editar</th>
            <th scope="col">Deletar</th>
          </tr>
        </thead>

        <tbody>

          {dados.map(dados => (
            <tr key={dados.id}>
              <td>{dados.nome}</td>
              <td>{dados.email}</td>
              <td>{dados.cpf}</td>
              <td>{dados.sexo}</td>
              <td>{dados.estado}</td>
              <td>{dados.cidade}</td>
              <td>
                <NavLink to={"/edituser/:" + dados.id}>
                  <button className="editar">Editar</button>
                </NavLink>
              </td>
              <td>
                <button className="deletar" value={dados.id} onClick={(e) => setId(e.target.value)}>Deletar</button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default Home