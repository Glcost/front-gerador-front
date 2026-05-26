/**
 * IA CV - Gerador de Currículo Inteligente
 * Core Script - Clean Code Architecture
 * * Organização do arquivo:
 * 1. CONFIGURAÇÕES E ESTADOS GLOBAIS
 * 2. SELETORES DO DOM
 * 3. MÓDULO DE AUTOCOMPLETE (COMPETÊNCIAS)
 * 4. MÓDULO DE AUTOCOMPLETE (ESCOLARIDADE)
 * 5. MÓDULO DE PROCESSAMENTO DO FORMULÁRIO (API)
 * 6. MÓDULO DE RENDERIZAÇÃO VISUAL (PREVIEW)
 * 7. MÓDULO DE EXPORTAÇÃO (PDF)
 */

// =========================================================================
// 1. CONFIGURAÇÕES E ESTADOS GLOBAIS
// =========================================================================

const API_URL = "http://127.0.0.1:5000/generate";

/**
 * Base de dados para sugestões inteligentes do autocomplete de Competências.
 */
const COMPETENCIAS_PRE_DEFINIDAS = [
    "HTML5", "CSS3", "JavaScript", "TypeScript", "Tailwind CSS", "Bootstrap",
    "React", "Vue.js", "Angular", "Next.js", "Nuxt.js", "Sass", "Cypress",
    "UX/UI Design", "Design Responsivo", "Acessibilidade Web (WCAG)", "Figma", "Adobe Photoshop",
    "Python", "Flask", "Django", "FastAPI", "Node.js", "Express", "Java", "Spring Boot",
    "C#", ".NET Core", "PHP", "Laravel", "Ruby on Rails", "Go (Golang)", "C++",
    "SQL", "SQLite", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "ORM (SQLAlchemy)",
    "API RESTful", "GraphQL", "Autenticação JWT", "OAuth 2.0", "Clean Code", "Arquitetura MVC",
    "Microsserviços", "Testes Unitários", "Segurança Web (OWASP)", "Prevenção XSS/SQL Injection",
    "Git", "GitHub", "GitLab", "Docker", "Kubernetes", "Linux / Bash", "AWS", "Google Cloud",
    "Azure", "Vercel", "Render", "CI/CD Pipelines", "GitHub Actions",
    "React Native", "Flutter", "Kotlin", "Swift", "Unity", "Unreal Engine",
    "Gestão Financeira", "Fluxo de Caixa", "Contabilidade Geral", "Faturamento", "Rotinas Administrativas",
    "Gestão de Pessoas", "Recrutamento e Seleção (RH)", "Treinamento e Desenvolvimento", "Departamento Pessoal",
    "Planejamento Estratégico", "Gestão de Projetos", "Scrum", "Kanban", "Metodologias Ágeis", "Jira", "Trello",
    "Microsoft Excel Avançado", "Power BI", "Análise de Dados", "ERP (SAP / Totvs)",
    "Vendas B2B", "Vendas B2C", "Prospecção de Clientes", "Negociação Comercial", "Fechamento de Contratos",
    "Atendimento ao Cliente (Customer Success)", "Pós-Venda", "Suporte Técnico", "Gestão de CRM (Salesforce/HubSpot)",
    "Telemarketing", "Marketing Digital", "Gestão de Tráfego (Google/Meta Ads)", "Copywriting", "Social Media",
    "Atendimento Ambulatorial", "Enfermagem Geral", "Pronto-Socorro e Triagem", "Sinais Vitais", "Cuidados Paliativos",
    "Fisioterapia Traumato-Ortopédica", "Ergonomia", "Nutrição Clínica", "Psicologia Organizacional",
    "Primeiros Socorros", "Segurança do Trabalho (NRs)", "Uso de EPIs", "Controle de Estoque Hospitalar",
    "Gestão Escolar", "Planejamento Pedagógico", "Língua Portuguesa (Nativo)", "Inglês Fluente", "Inglês Técnico",
    "Espanhol", "Francês", "EAD (Ensino a Distância)", "Gamificação na Educação (EdTech)", "Oratória e Didática",
    "Logística e Cadeia de Suprimentos", "Controle de Estoque (WMS)", "Expedição e Recebimento", "Curva ABC",
    "Operação de Empilhadeira", "Manutenção Preventiva", "Manutenção Corretiva", "Eletricidade Predial",
    "Instalações Elétricas", "Hidráulica", "Leitura de Projetos / Plantas", "Gestão de Compras e Fornecedores",
    "Produção Industrial", "Controle de Qualidade (5S / Lean)", "Gastronomia / Cozinha Profissional", "Segurança Alimentar",
    "Trabalho em Equipe", "Comunicação Assertiva", "Resolução de Problemas Complexos", "Pensamento Crítico",
    "Gestão do Tempo e Produtividade", "Adaptabilidade e Resiliência", "Proatividade e Iniciativa",
    "Liderança e Mentoria", "Organização e Metodologia", "Aprendizagem Rápida", "Empatia e Relações Interpessoais",
    "Inteligência Emocional", "Negociação de Conflitos", "Ética Profissional"
];

/**
 * Base de dados para sugestões inteligentes do autocomplete de Escolaridade.
 */
const ESCOLARIDADES_PRE_DEFINIDAS = [
    "Ensino Médio Completo", "Ensino Médio Incompleto", "Ensino Médio Técnico",
    "Ensino Fundamental Completo",
    "Técnico em Desenvolvimento de Sistemas", "Técnico em Informática", "Técnico em Administração",
    "Técnico em Enfermagem", "Técnico em Segurança do Trabalho", "Técnico em Logística",
    "Técnico em Mecatrônica", "Técnico em Eletrotécnica", "Técnico em Contabilidade",
    "Técnico em Recursos Humanos", "Técnico em Edificações", "Técnico em Agropecuária",
    "Técnico em Farmácia", "Técnico em Radiologia",
    "Tecnólogo em Análise e Desenvolvimento de Sistemas (ADS)", "Tecnólogo em Gestão de Recursos Humanos",
    "Tecnólogo em Logística", "Tecnólogo em Marketing", "Tecnólogo em Gestão Financeira",
    "Tecnólogo em Gestão Comercial", "Tecnólogo em Estética e Cosmética", "Tecnólogo em Redes de Computadores",
    "Tecnólogo em Gestão da Tecnologia da Informação", "Tecnólogo em Design Gráfico", "Tecnólogo em Automação Industrial",
    "Engenharia de Software", "Ciência da Computação", "Sistemas de Informação",
    "Engenharia Civil", "Engenharia de Produção", "Engenharia Mecânica", "Engenharia Elétrica",
    "Administração de Empresas", "Ciências Contábeis", "Direito", "Enfermagem", "Medicina",
    "Psicologia", "Odontologia", "Fisioterapia", "Pedagogia", "Letras", "Educação Física",
    "Matemática", "Arquitetura e Urbanismo", "Medicina Veterinária", "Farmácia", "Nutrição",
    "Jornalismo", "Publicidade e Propaganda", "Design de Interiores", "Serviço Social",
    "Pós-Graduação Lato Sensu", "Especialização", "MBA em Gestão de Projetos", "MBA em Gestão Estratégica de Negócios",
    "MBA em Liderança e Gestão de Pessoas", "MBA em Finanças e Controladoria", "Mestrado", "Doutorado", "Pós-Doutorado",
    "Bootcamp Fullstack", "Bootcamp Frontend", "Bootcamp Backend", "Curso Intensivo de Programação",
    "Certificação AWS", "Certificação Microsoft", "Certificação Cisco",
    "Inglês Avançado", "Espanhol Avançado",
    "Etec", "Fatec", "Senai", "Senac", "Sebrae", "IFSP",
    "FAIT (Faculdades Integradas)", "UNESP", "Universidade Federal", "Universidade Estadual"
];

// Instâncias de estado da aplicação (Arrays de controle de tags)
let tagsEscolhidas = [];
let escolaridadesEscolhidas = [];


// =========================================================================
// 2. SELETORES DO DOM
// =========================================================================

// Componentes da seção de Competências
const tagsContainer = document.getElementById('tags-container');
const inputTecnologias = document.getElementById('tecnologias-input');
const listaSugestoes = document.getElementById('sugestoes-lista');

// Componentes da seção de Escolaridade
const escContainer = document.getElementById('tags-escolaridade-container');
const escInput = document.getElementById('escolaridade-input');
const escLista = document.getElementById('lista-escolaridade-sugestoes');

// Componentes estruturais e feedbacks visuais de tela
const spinner = document.getElementById('loading-spinner');
const btnEnviar = document.getElementById('btn-enviar');
const resultadoContainer = document.getElementById('resultado-container');
const curriculoPlaceholder = document.getElementById('curriculo-placeholder');
const curriculoConteudo = document.getElementById('curriculo-conteudo');
const acoesContainer = document.getElementById('acoes-container');
const errorContainer = document.getElementById('error-message');
const errorText = document.getElementById('error-text');


// =========================================================================
// 3. MÓDULO DE AUTOCOMPLETE (COMPETÊNCIAS)
// =========================================================================

// Foca no input interno de texto ao clicar na área do container de tags
tagsContainer.addEventListener('click', () => inputTecnologias.focus());

// Monitora digitação para filtrar e exibir termos compatíveis
inputTecnologias.addEventListener('input', (e) => {
    const textoDigitado = e.target.value.trim().toLowerCase();

    if (textoDigitado === "") {
        fecharSugestoes();
        return;
    }

    const filtradas = COMPETENCIAS_PRE_DEFINIDAS.filter(tech =>
        tech.toLowerCase().includes(textoDigitado) && !tagsEscolhidas.includes(tech)
    );

    renderizarSugestoes(filtradas);
});

// Captura gatilhos para inserção direta de tags customizadas
inputTecnologias.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const valor = inputTecnologias.value.trim().replace(',', '');
        if (valor && !tagsEscolhidas.includes(valor)) {
            adicionarTag(valor);
        }
    }
});

function renderizarSugestoes(lista) {
    if (lista.length === 0) {
        fecharSugestoes();
        return;
    }
    // Renderização com hovers baseados na cor Saddle Brown (854D27)
    listaSugestoes.innerHTML = lista.map(tech => `
        <li class="px-5 py-2.5 hover:bg-orange-50/60 hover:text-brand-saddle cursor-pointer transition-colors font-medium text-stone-700" 
            onclick="clicarSugestao('${tech}')">
            ${tech}
        </li>
    `).join('');
    listaSugestoes.classList.remove('hidden');
}

function fecharSugestoes() {
    listaSugestoes.classList.add('hidden');
    listaSugestoes.innerHTML = "";
}

function clicarSugestao(tech) {
    adicionarTag(tech);
    fecharSugestoes();
}

function adicionarTag(tech) {
    tagsEscolhidas.push(tech);
    inputTecnologias.value = "";
    atualizarTagsVisuais();
}

function removerTag(index) {
    tagsEscolhidas.splice(index, 1);
    atualizarTagsVisuais();
}

function atualizarTagsVisuais() {
    // Limpa a árvore de elementos visuais antigos para evitar duplicação
    const elementosTag = tagsContainer.querySelectorAll('.tag-badge');
    elementosTag.forEach(el => el.remove());

    // Injeta os novos badges estilizados com a paleta terrosa sutil (Fundo pastel + Borda Chocolate)
    tagsEscolhidas.forEach((tech, index) => {
        const span = document.createElement('span');
        span.className = 'tag-badge bg-orange-50/60 text-brand-saddle text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-brand-chocolate/20 select-none transition-all';
        span.innerHTML = `
            ${tech}
            <button type="button" onclick="removerTag(${index})" class="hover:text-brand-chocolate font-bold ml-1 text-[13px] leading-none">&times;</button>
        `;
        tagsContainer.insertBefore(span, inputTecnologias);
    });
}


// =========================================================================
// 4. MÓDULO DE AUTOCOMPLETE (ESCOLARIDADE)
// =========================================================================

escContainer.addEventListener('click', () => escInput.focus());

escInput.addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    if (!termo) { escLista.classList.add('hidden'); return; }

    const filtradas = ESCOLARIDADES_PRE_DEFINIDAS.filter(item =>
        item.toLowerCase().includes(termo) && !escolaridadesEscolhidas.includes(item)
    );
    renderizarEscolaridade(filtradas);
});

escInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const valor = escInput.value.trim().replace(',', '');
        if (valor && !escolaridadesEscolhidas.includes(valor)) {
            adicionarEscolaridade(valor);
        }
    }
});

function renderizarEscolaridade(lista) {
    if (lista.length === 0) { escLista.classList.add('hidden'); return; }
    escLista.innerHTML = lista.map(item => `
        <li class="px-5 py-2.5 hover:bg-orange-50/60 hover:text-brand-saddle cursor-pointer text-stone-700 font-medium transition-colors" 
            onclick="adicionarEscolaridade('${item}')">${item}</li>
    `).join('');
    escLista.classList.remove('hidden');
}

function adicionarEscolaridade(item) {
    escolaridadesEscolhidas.push(item);
    escInput.value = "";
    escLista.classList.add('hidden');
    atualizarTagsEscolaridade();
}

function removerEscolaridade(index) {
    escolaridadesEscolhidas.splice(index, 1);
    atualizarTagsEscolaridade();
}

function atualizarTagsEscolaridade() {
    escContainer.querySelectorAll('.tag-esc').forEach(el => el.remove());
    escolaridadesEscolhidas.forEach((item, index) => {
        const span = document.createElement('span');
        span.className = 'tag-esc bg-stone-100 text-brand-dark text-[11px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-stone-200 select-none transition-all';
        span.innerHTML = `
            ${item} 
            <button type="button" onclick="removerEscolaridade(${index})" class="hover:text-brand-chocolate font-bold ml-1 text-[13px] leading-none">&times;</button>
        `;
        escContainer.insertBefore(span, escInput);
    });
}

// Ouvinte global para fechar os menus de contexto caso o usuário clique em áreas neutras da tela
document.addEventListener('click', (e) => {
    if (!tagsContainer.contains(e.target) && !listaSugestoes.contains(e.target)) fecharSugestoes();
    if (!escContainer.contains(e.target) && !escLista.contains(e.target)) escLista.classList.add('hidden');
});


// =========================================================================
// 5. MÓDULO DE PROCESSAMENTO DO FORMULÁRIO (API)
// =========================================================================

async function gerarCurriculo(event) {
    event.preventDefault();

    // Processamento de segurança: Adiciona textos soltos pendentes nos inputs como tags válidas
    if (inputTecnologias.value.trim() !== "") adicionarTag(inputTecnologias.value.trim());
    if (escInput.value.trim() !== "") adicionarEscolaridade(escInput.value.trim());

    // Regra de Validação de Dados Mínimos
    if (tagsEscolhidas.length === 0) {
        mostrarErro("Por favor, adicione pelo menos uma competência ou tecnologia para que o modelo processe.");
        inputTecnologias.focus();
        return;
    }

    // Estruturação do payload de transmissão respeitando a divisão de dados de contato
    const payload = {
        nome_completo: document.getElementById('nome_completo').value.trim(),
        cargo_pretendido: document.getElementById('cargo_pretendido').value.trim(),
        localizacao: document.getElementById('localizacao').value.trim(),
       contato: {
            email: document.getElementById('contato_email').value.trim(),
            telefone: document.getElementById('contato_telefone').value.trim()
        },
        tecnologias: tagsEscolhidas.join(', '),
        escolaridade: escolaridadesEscolhidas.join(', '),
        texto_experiencias: document.getElementById('texto_experiencias').value.trim()
    };

    // Atualização de estados visuais de carregamento na tela
    errorContainer.classList.add('hidden');
    spinner.classList.remove('hidden');
    btnEnviar.disabled = true;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (data.status === "success") {
            exibirCurriculo(data.dados_curriculo);
        } else {
            mostrarErro(data.message || "Ocorreu uma inconsistência no processamento inteligente dos dados.");
        }

    } catch (error) {
        mostrarErro("Incapaz de estabelecer comunicação com a inteligência artificial. Verifique se o backend em Flask está ativo.");
        console.error("Erro na requisição à API:", error);
    } finally {
        spinner.classList.add('hidden');
        btnEnviar.disabled = false;
    }
}


// =========================================================================
// 6. MÓDULO DE RENDERIZAÇÃO VISUAL (PREVIEW)
// =========================================================================

function exibirCurriculo(dados) {
    console.log("Retorno da API do Gemini:", dados); 
    
    // Altera visibilidade estrutural...
    curriculoPlaceholder.classList.add('hidden');
    // Altera visibilidade estrutural ocultando placeholders e liberando a folha
    curriculoPlaceholder.classList.add('hidden');
    resultadoContainer.classList.remove('justify-center');
    curriculoConteudo.classList.remove('hidden');
    acoesContainer.classList.remove('hidden');

    // Injeção de marcação limpa, polida e estilizada na folha utilizando variáveis de cor customizadas
    curriculoConteudo.innerHTML = `
        <div class="border-b border-stone-200 pb-6 text-center sm:text-left">
            <h2 id="cv-nome" class="text-3xl font-bold tracking-tight text-brand-dark">${dados.dados_basicos.nome_completo}</h2>
            <p class="text-lg font-semibold text-brand-chocolate mt-1">${dados.dados_basicos.cargo_pretendido}</p>
            <div class="text-[11px] text-stone-500 mt-4 flex flex-wrap justify-center sm:justify-start gap-x-5 gap-y-1.5 font-medium">
                ${dados.dados_basicos.localizacao ? `<span>📍 ${dados.dados_basicos.localizacao}</span>` : ''}
                ${dados.dados_basicos.contato?.email ? `<span>✉️ ${dados.dados_basicos.contato.email}</span>` : ''}
                ${dados.dados_basicos.contato?.telefone ? `<span>📞 ${dados.dados_basicos.contato.telefone}</span>` : ''}
            </div>
        </div>

        <div class="space-y-2">
            <h3 class="text-[11px] font-bold uppercase tracking-wider text-brand-dark border-l-4 border-brand-chocolate pl-3">Perfil Profissional</h3>
            <p class="text-stone-700 text-justify leading-relaxed">${dados.perfil_profissional.resumo}</p>
        </div>

        <div class="space-y-2.5">
            <h3 class="text-[11px] font-bold uppercase tracking-wider text-brand-dark border-l-4 border-brand-chocolate pl-3">Competências e Tecnologias</h3>
            <div class="flex flex-wrap gap-1.5 pt-0.5">
                ${dados.competencias.tecnologias.map(tech => `<span class="bg-stone-100 text-brand-dark text-[11px] px-3 py-1 rounded-full border border-stone-200 font-medium">${tech}</span>`).join('')}
                ${dados.competencias.metodologias_e_conceitos.map(conc => `<span class="bg-orange-50 text-brand-saddle text-[11px] px-3 py-1 rounded-full border border-brand-chocolate/15 font-medium">${conc}</span>`).join('')}
            </div>
        </div>

       <div class="space-y-3.5">
            <h3 class="text-[11px] font-bold uppercase tracking-wider text-brand-dark border-l-4 border-brand-chocolate pl-3">Experiência Profissional</h3>
            <div class="space-y-4">
                ${dados.projetos_principais.map(proj => `
                    <div>
                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                            <h4 class="font-bold text-brand-dark text-sm">${proj.nome_projeto}</h4>
                            ${proj.tecnologias_utilizadas && proj.tecnologias_utilizadas.length > 0 ? `<span class="text-[10px] text-brand-saddle/90 font-semibold uppercase tracking-wider">${proj.tecnologias_utilizadas.join('  |  ')}</span>` : ''}
                        </div>
                        <ul class="list-disc pl-5 text-stone-700 space-y-1.5 mt-2 text-justify">
                            ${proj.descricao_atividades.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="space-y-3">
            <h3 class="text-[11px] font-bold uppercase tracking-wider text-brand-dark border-l-4 border-brand-chocolate pl-3">Formação Acadêmica</h3>
            <div class="space-y-3">
                ${dados.formacao_academica.map(form => `
                    <div>
                        <div class="flex justify-between font-bold text-brand-dark">
                            <span>${form.curso}</span>
                            <span class="font-semibold text-brand-chocolate text-[11px]">${form.status}</span>
                        </div>
                        <p class="text-stone-500 font-medium text-[11px]">${form.instituicao}</p>
                        ${form.detalhes ? `<p class="text-stone-400 italic text-[11px] mt-0.5">${form.detalhes}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="space-y-2">
            <h3 class="text-[11px] font-bold uppercase tracking-wider text-brand-dark border-l-4 border-brand-chocolate pl-3">Idiomas</h3>
            <div class="grid grid-cols-2 gap-x-4 gap-y-1.5 text-stone-700">
                ${dados.idiomas.map(id => `<p><strong class="text-brand-dark font-semibold">${id.idioma}:</strong> ${id.nivel}</p>`).join('')}
            </div>
        </div>
    `;

    // Rolagem suave de foco visual para o topo da folha
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function mostrarErro(mensagem) {
    errorText.innerText = mensagem;
    errorContainer.classList.remove('hidden');
}

function reiniciarFormulario() {
    document.getElementById('resume-form').reset();
    document.getElementById('contato_email').value = "";
    document.getElementById('contato_telefone').value = "";

    // Reseta por completo as variáveis de estado em memória
    tagsEscolhidas = [];
    escolaridadesEscolhidas = [];
    atualizarTagsVisuais();
    atualizarTagsEscolaridade();

    // Restaura o estado visual padrão da tela (Empty State)
    curriculoPlaceholder.classList.remove('hidden');
    resultadoContainer.classList.add('justify-center');
    curriculoConteudo.classList.add('hidden');
    acoesContainer.classList.add('hidden');
    errorContainer.classList.add('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// =========================================================================
// 7. MÓDULO DE EXPORTAÇÃO (PDF)
// =========================================================================

function baixarCurriculoPDF() {
    if (typeof html2pdf === 'undefined') {
        alert("A dependência 'html2pdf' não pôde ser encontrada no escopo global.");
        return;
    }

    const elemento = document.getElementById('curriculo-conteudo');
    const nomeUsuario = document.getElementById('cv-nome')?.innerText || 'curriculo';

    // Higienização completa de strings via RegEx para geração limpa do nome do arquivo físico (.pdf)
    const nomeArquivo = 'curriculo-' + nomeUsuario
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '') + '.pdf';

    // Criação de um clone isolado da folha para manipulação assíncrona de estilos de impressão
    const clone = elemento.cloneNode(true);

    // Ajustes finos de encapsulamento para garantir renderização perfeita em formato A4
    clone.style.display = 'block';
    clone.style.padding = '25mm';
    clone.style.backgroundColor = '#ffffff';
    clone.style.color = '#2E1F27'; // Injeta a cor escura base explicitamente para o interpretador canvas

    const opcoes = {
        margin: [0, 0, 0, 0],
        filename: nomeArquivo,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
            letterRendering: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        html2pdf().set(opcoes).from(clone).save();
    } catch (error) {
        alert("Falha crítica no motor de compilação do arquivo PDF físico.");
        console.error("PDF engine crash error:", error);
    }
}