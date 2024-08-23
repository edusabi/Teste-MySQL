import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import "./EditUser.css"

const EditUser = () => {    
    const idCom2Pontos = useParams();
    const id = idCom2Pontos.id;

    const [nome, setNome] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [cpf, setCpf] = useState(''); 
    const [sexo,setSexo] = useState(''); 

    const [selectedUf, setSelectedUf] = useState(""); // Estado que foi pego com a API
    const [selectedCidade, setSelectedCidade] = useState(""); // Cidade que foi pega com a API

    
    // Selecionar os estados e cidades da API
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);

    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then((response) => response.json())
            .then((data) => setEstados(data));
    }, []);

    useEffect(() => {
        if(selectedUf) {
            fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
                .then((response) => response.json())
                .then((data) => setCidades(data));
        }
    }, [selectedUf]);

    function handleSelectedUf(e) {
        const uf = e.target.value;
        setSelectedUf(uf);
        setSelectedCidade(""); // Limpar a cidade selecionada ao mudar o estado
    };

    function handleSelectedCidade(e) {
        const cidade = e.target.value;
        setSelectedCidade(cidade);
    };

    const handleSubmitEdit = async(e)=>{
        e.preventDefault();

        const newEditUser = {
            nome,
            email,
            cpf,
            sexo,
            selectedUf,
            selectedCidade
        }

        const response = await fetch(`http://localhost:3000/editUser/${id}`,{
             method: "PUT",
             headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newEditUser)
        });

        const data = await response.json();
        console.log(data)
    };

  return (
    <div>

        <h1>EditUser</h1>
<div className="containerForms">

<form onSubmit={handleSubmitEdit}>

<label>

    <span>Nome</span>
    <input type="text" name="nome" 
    onChange={(e)=>setNome(e.target.value)}
    value={nome}/>
    
</label>

<label>

    <span>E-mail</span>
    <input type="email" name="email" 
    onChange={(e)=>setEmail(e.target.value)}
    value={email}/>

</label>

<label>

    <span>CPF</span>
    <input type="text" name="cpf"
    onChange={(e)=>setCpf(e.target.value)}
    value={cpf}/>

</label>

<label className="sexo">

    <span>Sexo</span>

<div>
    <span>Homem</span>
    <input type="radio" name="sexo" onChange={(e)=>setSexo(e.target.value)} value="Homem"/>
</div>

<div>
    <span>Mulher</span>
    <input type="radio" name="sexo" value="Mulher" onChange={(e)=>setSexo(e.target.value)}/>
</div>

</label>

<label>
        <span>Estado:</span>
        <select 
            name="estado" 
            id="estado"  
            required
            onChange={handleSelectedUf} 
            value={selectedUf}
        >
            <option value="">Escolha um estado</option>
            {estados.map((estado) => (
                <option key={estado.id} value={estado.sigla}>{estado.nome}</option>
            ))}
        </select>
    </label>

    <label>
        <span>Cidade:</span>
        <select 
            name="cidade" 
            id="cidade" 
            required
            disabled={!selectedUf} // Desabilitar se o estado não estiver selecionado
            onChange={handleSelectedCidade} 
            value={selectedCidade}>
            <option value="">Escolha uma cidade</option>
            {cidades.map((cidade) => (
                <option key={cidade.id} value={cidade.nome}>{cidade.nome}</option>
            ))}
        </select>
    </label>

<button>Enviar cadastro</button>

</form>

</div>

    </div>
  )
}

export default EditUser