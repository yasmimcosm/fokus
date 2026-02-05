
    const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
    const formAdicionarTarefa = document.querySelector('.app__form-add-task')
    const textarea = document.querySelector('.app__form-textarea')
    const ulTarefas = document.querySelector('.app__section-task-list')
    const listaTarefasAtivas = document.querySelector('.app__section-active-task-description')

    const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
    const btnRemoverTodas = document.querySelector('#btn-remover-todas')

    const btnCancelar = document.querySelector('.app__form-footer__button--cancel')
    const btnApagar = document.querySelector('.app__form-footer__button--delete')

    // ESTADO

    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

    // LOCAL STORAGE

    function atualizarTarefas() {
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }

    // LISTA "EM ANDAMENTO"
    
    function atualizarListaEmAndamento() {
        listaTarefasAtivas.innerHTML = ''

        const ativas = tarefas.filter(tarefa => !tarefa.completa)

        if (ativas.length === 0) {
            listaTarefasAtivas.innerHTML = ''
            return
        }

        ativas.forEach(tarefa => {
            const li = document.createElement('li')
            li.textContent = tarefa.descricao
            listaTarefasAtivas.appendChild(li)
        })
    }

    // CRIAR TAREFA

    function criarElementoTarefa(tarefa) {
        const li = document.createElement('li')
        li.classList.add('app__section-task-list-item')

        const svg = document.createElement('svg')
        svg.innerHTML = `
            <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
                <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                    fill="#01080E"></path>
            </svg>
        `

        const paragrafo = document.createElement('p')
        paragrafo.textContent = tarefa.descricao
        paragrafo.classList.add('app__section-task-list-item-description')

        const botao = document.createElement('button')
        botao.classList.add('app_button-edit')

        botao.onclick = (e) => {
            e.stopPropagation()
            const novaDescricao = prompt('Qual é o novo nome da tarefa?')
            if (novaDescricao) {
                tarefa.descricao = novaDescricao
                paragrafo.textContent = novaDescricao
                atualizarTarefas()
                atualizarListaEmAndamento()
            }
        }

        const imagemBotao = document.createElement('img')
        imagemBotao.src = '/imagens/edit.png'
        botao.append(imagemBotao)

        li.append(svg, paragrafo, botao)

        function atualizarVisual() {
            li.classList.toggle(
                'app__section-task-list-item-complete',
                tarefa.completa
            )

            if (tarefa.completa) {
                botao.setAttribute('disabled', 'disabled')
            } else {
                botao.removeAttribute('disabled')
            }
        }

        li.onclick = () => {
            tarefa.completa = !tarefa.completa
            atualizarVisual()
            atualizarTarefas()
            atualizarListaEmAndamento()
        }

        atualizarVisual()
        return li
    }

    // EVENTOS

    // abrir / fechar formulário
    btnAdicionarTarefa.addEventListener('click', () => {
        formAdicionarTarefa.classList.toggle('hidden')
    })

    // salvar tarefa
    formAdicionarTarefa.addEventListener('submit', (evento) => {
        evento.preventDefault()

        if (!textarea.value.trim()) return

        const tarefa = {
            descricao: textarea.value,
            completa: false
        }

        tarefas.push(tarefa)

        const elementoTarefa = criarElementoTarefa(tarefa)
        ulTarefas.append(elementoTarefa)

        atualizarTarefas()
        atualizarListaEmAndamento()

        textarea.value = ''
        formAdicionarTarefa.classList.add('hidden')
    })

    // cancelar
    btnCancelar.addEventListener('click', () => {
        textarea.value = ''
        formAdicionarTarefa.classList.add('hidden')
    })

    // apagar texto
    btnApagar.addEventListener('click', () => {
        textarea.value = ''
    })

    // remover tarefas
    const removerTarefas = (somenteCompletas) => {
        let seletor = '.app__section-task-list-item'
        if (somenteCompletas) {
            seletor = '.app__section-task-list-item-complete'
        }

        document.querySelectorAll(seletor).forEach(el => el.remove())

        tarefas = somenteCompletas
            ? tarefas.filter(tarefa => !tarefa.completa)
            : []

        atualizarTarefas()
        atualizarListaEmAndamento()
    }

    btnRemoverConcluidas.onclick = () => removerTarefas(true)
    btnRemoverTodas.onclick = () => removerTarefas(false)


    // INICIALIZAÇÃO
    tarefas.forEach(tarefa => {
        const elementoTarefa = criarElementoTarefa(tarefa)
        ulTarefas.append(elementoTarefa)
    })

    // cancelar formulário
    btnCancelar.addEventListener('click', () => {
        textarea.value = ''
        formAdicionarTarefa.classList.add('hidden')
    })

    // apagar texto digitado
    btnApagar.addEventListener('click', () => {
        textarea.value = ''
    })

    atualizarListaEmAndamento()
