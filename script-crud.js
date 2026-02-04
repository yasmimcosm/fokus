
    const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
    const formAdicionarTarefa = document.querySelector('.app__form-add-task')
    const textarea = document.querySelector('.app__form-textarea')

    const tarefasLista = []

    btnAdicionarTarefa.addEventListener ('click', () => {
        formAdicionarTarefa.classList.toggle('hidden');
    })

    formAdicionarTarefa.addEventListener ('sumbit', (evento) => {
        evento.preventDefault();
        const tarefa = {
            descricao: textarea.value
        }

        tarefasLista.push(tarefa)
        localStorage.setItem('tarefas', JSON.stringify(tarefasLista))
    })