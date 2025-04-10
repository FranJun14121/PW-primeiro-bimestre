

import React, { useState, useEffect } from 'react';

function ListaTarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState('');

    // carrega tarefas do localstorage ao montar o componente
    useEffect(() => {
        const tarefasSalvas = localStorage.getItem('tarefas');
        if (tarefasSalvas) {
            setTarefas(JSON.parse(tarefasSalvas));
        }
    }, []);

    // salvar tarefas no localstorage quando mudar algo
    useEffect(() => {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }, [tarefas]);

    //  adicionar uma nova tarefa
    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== '') {
            setTarefas([...tarefas, { texto: novaTarefa, concluida: false }]);
            setNovaTarefa('');
        }
    };

    // remover uma tarefa
    const removerTarefa = (indice) => {
        setTarefas(tarefas.filter((_, i) => i !== indice));
    };

    //  marcar uma tarefa como concluida ou nao
    const marcarConcluida = (indice) => {
        const novasTarefas = tarefas.map((tarefa, i) => {
            if (i === indice) {
                return { ...tarefa, concluida: !tarefa.concluida };
            }
            return tarefa;
        });
        setTarefas(novasTarefas);
    };

    // funcao para ordenar as tarefas
    const ordenarTarefas = () => {
        const tarefasOrdenadas = [...tarefas].sort((a, b) => {
            if (a.concluida && !b.concluida) return 1; // concluidas vao pro final
            if (!a.concluida && b.concluida) return -1; // nao concluidas vao pro inicio
            return a.texto.localeCompare(b.texto); // ordem alfabetica
        });
        setTarefas(tarefasOrdenadas);
    };

    return (
        <div>
            <h2>Lista de Tarefas</h2>
            <input
                type='text'
                value={novaTarefa}
                onChange={(e) => setNovaTarefa(e.target.value)}
                placeholder='Digite uma nova tarefa'
            />
            <button onClick={adicionarTarefa}>Adicionar</button>
            <button onClick={ordenarTarefas}>Ordenar Tarefas</button>
            <ul>
                {tarefas.map((tarefa, indice) => (
                    <li key={indice} style={{ textDecoration: tarefa.concluida ? 'line-through' : 'none' }}>
                        {tarefa.texto}
                        <button onClick={() => marcarConcluida(indice)}>
                            {tarefa.concluida ? 'Desmarcar' : 'Concluir'}
                        </button>
                        <button onClick={() => removerTarefa(indice)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaTarefas;