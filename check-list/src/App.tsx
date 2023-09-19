import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

export default function App () {
  const [input, setInput] = useState("");
  const [ atividades, setAtividades ] = useState<String[]>([]) 
  const [ editarAtividade, setEditarAtividade ] = useState({ 
    enabled: false,
    atividade: ''
  })
  const inputRef = useRef  <HTMLInputElement>(null);
  const primeiraR = useRef(true)


  useEffect(() => {
    const atividadeSalva = localStorage.getItem("@cursoreact")
    if (atividadeSalva) { 
      setAtividades(JSON.parse(atividadeSalva));
    }
  }, [])

  useEffect( () => {
    if (primeiraR.current) { 
      primeiraR.current=false;
      return;
    }
    localStorage.setItem("@cursoreact", JSON.stringify ( atividades ))
  }, [atividades])

  const registrar = useCallback ( () => {
    if (!input) {
      alert("Digite sua atividade")
      return
    }
    if(editarAtividade.enabled){ 
      editarAtividadeSalva(); 
      return
    }

    setAtividades(Atividades => [...Atividades,input])
    setInput("");
  }, [ input, atividades ])

  function editarAtividadeSalva () { 
    const IndexAtividades = atividades.findIndex(movies => movies === editarAtividade.atividades) 
    const todasAtividades = [...atividades];
    todasAtividades[IndexAtividades] = input 
    setAtividades(todasAtividades); 
    setEditarAtividade ({ 
      enabled: false, 
      atividades: ''
    })
    setInput("")
  }

  function excluir ( item: String ) {
    const deletarAtividade = atividades.filter(atividades => atividades !== item) 
    setAtividades(deletarAtividade)

  }

  function editar ( item: String ) {
    inputRef.current?.focus(); 
    setInput(item)
    setEditarAtividade({
      enabled: true,
      atividades: item
    })
  }

  const totalMovies = useMemo(() => { 
    return atividades.length
  }, [atividades])

  return (
    <div className='containerDiv'>
      <br></br>
      <h1>Check-list</h1>
      <input
        placeholder="Digite sua atividade" 
        value={ input }
        onChange={(e) => setInput(e.target.value)}
        ref={ inputRef }
      />
      <button className='bt-confirmar' onClick={ registrar } > { editarAtividade.enabled ? "Atualizar filme" : "Adicionar filme"}</button>
      <hr/>
      {atividades.map( (item) => ( 
        <section key={item} >
          <div>
            <span>{item}</span>
            <button onClick={ () => excluir(item) } >Excluir</button>
            <button onClick={ () => editar(item) } >Editar</button>
          </div>
        </section>
      ))}
      <hr/>
</div>
  )
}
