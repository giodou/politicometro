//variavel para armazenar os candidatos carregados dentro do array, e nao ficar buscando desnecessariamente
//a todo momento

var LOADED_CANDIDATES = {
    lastLoadedType: null,
    loadedCandidates: []
};

//faz os carregamentos iniciais, apos a tela estar pronta
$(window).on("load", function () {

    debugger
    console.log(localStorage.getItem("user"));

    PlaceCandidate(1);
    candidates = [];

     LoadCandidatesByType(2);

    //ao mudar o tipo de cadidato na tela, essa funcao e chamada
     $("#candidateType").on("change", function () {
         LoadCandidatesByType(parseInt($("#candidateType").val()), function (retorno) {
             PlaceCandidate(LOADED_CANDIDATES.loadedCandidates[0].candidateId);
         });     
    })

});


//"Muda" os dados do candidato carregado na tela
function PlaceCandidate(CandidateId) {
    var candidate = FindCandidate(CandidateId);

    $("#candidateId").val(CandidateId);
    $("#candidateName").text(candidate.candidateName);
    $("#candidateImg").attr("src", candidate.candidateImg);
    $("#candidateParty").text(candidate.candidateParty);
}

//encontra o candidato pelo ID
function FindCandidate(candidateId) {
    return LoadAllCandidates().filter(function (candidate) {
        return candidate.candidateId === candidateId;
    })[0];
};

//carrega o proximo candidato da lista
function GetNextCandidate(candidateId) {
    candidate = FindCandidate(candidateId);
    
    GetCandidatePosition(candidate, function (CandidadePosition) {
        if (CandidadePosition == null || CandidadePosition + 1 == LOADED_CANDIDATES.loadedCandidates.length) {
            $("#modalNoMoreCandidates").modal('show');
            return false;
        }

        //apos encontrar a posicao do candidato dentro do array, avanca para a proxima posicao
        PlaceCandidate(LOADED_CANDIDATES.loadedCandidates[CandidadePosition + 1].candidateId)
    })
    
}

function Like() {
    var candidateId = parseInt($("#candidateId").val());
    GetNextCandidate(candidateId);
}

function UnLike() {
    var candidateId = parseInt($("#candidateId").val());
    GetNextCandidate(candidateId);
}

//carrega a lista de candidatos, conforme o tipo de candidato selecionado
//se o tipo de candidato a ser carregado passado como parametro, for igual ao ultimo carregado,
//nao faz nada para poupar recursos
function LoadCandidatesByType(TypeId, callback) {
    if (TypeId === LOADED_CANDIDATES.lastLoadedType)
        return false;

    LOADED_CANDIDATES.lastLoadedType = TypeId;

    //essa funcao "loadCandidates" so existe nesse escopo, 
    //basicamente retorna os candidatos filtrados de acordo com o parametro "TypeId"
    function loadCandidates(TypeId) {
        var candidatesToFilterByType = [...LoadAllCandidates()];

        var candidatesFilteredByType = [];

        for (var i = 0; i < candidatesToFilterByType.length; i++){
            if (candidatesToFilterByType[i].candidateType == TypeId)
                candidatesFilteredByType.push(candidatesToFilterByType[i]);
        }
        
        return candidatesFilteredByType;
    }
    
    LOADED_CANDIDATES.loadedCandidates = loadCandidates(TypeId);

    if (callback)
        return callback(true)
    
    return LOADED_CANDIDATES.loadedCandidates;
}

//retorna a posicao do candidato dentro do array
function GetCandidatePosition(candidate, callback) {
    for (var i = 0; i < LOADED_CANDIDATES.loadedCandidates.length; i++){
        if (LOADED_CANDIDATES.loadedCandidates[i].candidateId === candidate.candidateId) {
            return callback(i);
        }
    }

    return callback(null);
}


function ViewDetailsCandidate() {
    //carrega o candidato que esta atualmente sendo exibido
    var currentCandidate = FindCandidate(parseInt($("#candidateId").val()));
    
    $('#modalCandidateName').text(currentCandidate.candidateName);
    $('#modalCandidateName').html(BuildHtmlCandidateInfo(currentCandidate.candidateId));
    $('.MyCollapse').collapse();
    $('.MyCollapse').collapse('hide');

    $('#modalDetailCandidate').modal('show');
    
}

function BuildHtmlCandidateInfo(candidateId) {
    var html = '<div class="MyCollapse">';

    var info = GetSelectedCandidateInfo(candidateId);

    if (info == null)
        html += "<p>Não há informações sobre esse parlamentar</p>";

    else {
        html += LoadCandidateProcess(info);
        html += '<hr />';
        html += LoadCandidateLaws(info);
    }

    html += '</div>';

    return html;
}

function LoadCandidateLaws(info) {
    function GetLawInfoTransformation(lawArray) {
        var laws = lawArray.map(function (law) {
            return {
                title: law.lawTitle,
                info: law.lawDescription
            }
        });

        if (lawArray.length == 0)
            return "<p>Esse parlamentar não contribuiu para a aprovação de nennhuma lei</p>";

        return laws;
    }

    return BuildColapsibbleInfoSession("Leis que criou ou participou na votação", GetLawInfoTransformation(info.laws));
}

function LoadCandidateProcess(info) {
    function GetProcessInfoTransformation(processArray) {
        var openProcess = processArray.map(function (process) {
            return {
                title: process.processTitle,
                info: process.processDescription
            }
        });

        if (processArray.length == 0)
            return "<p>Não há processos abertos contra esse parlamentar</p>";

        return openProcess;
    }

    return BuildColapsibbleInfoSession("Processos contra o candidato", GetProcessInfoTransformation(info.openProcess));
}

function BuildColapsibbleInfoSession(title, arrayInfos) {
    var idInfo = uuidv4();
    var html = '<button class="btn btn-info" type="button" data-toggle="collapse" data-target="#'+idInfo+'" aria-expanded="false" aria-controls="' + idInfo + '">' + title + ' </button >';

    html += '<div class="collapse" id="' + idInfo + '">';

    if (typeof arrayInfos === 'string' || arrayInfos instanceof String) {
        html += BuildColapsibbleInfo("", arrayInfos);
    }
    else {
        for (var i = 0; i < arrayInfos.length; i++) {
            html += BuildColapsibbleInfo(arrayInfos[i].title, '<p style="font-size: 15px;" >'+arrayInfos[i].info+'</p>');
        }
    }
    
    html += '</div>';

    return html;
}

function BuildColapsibbleInfo(title, info) {
    var html = '<div class="card card-body">';
        html += '<h3>' + title + '</h3>';
        html +=  info ;
        html += "</div>";

        return html;
}

function GetSelectedCandidateInfo(candidateId) {
    for (var i = 0; i < GetCandidateInfo().length; i++) {
        if (GetCandidateInfo()[i].candidateId == candidateId) {
            return GetCandidateInfo()[i];
        }
    }

    return null;
}


/**
<p>
    <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
        Link with href
  </a>
    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
        Button with data-target
  </button>
</p>
    <div class="collapse" id="collapseExample">
        <div class="card card-body">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  </div>
    </div>

**/

/**

{
    candidateId: 9,
        openProcess: [
            {
                processTitle: '647/2011 - STF',
                processLink: 'http://portal.stf.jus.br/processos/detalhe.asp?incidente=4160986',
                processDescription: '0004448-42.2007.8.16.0004 - TJ-PRÉ réu em ação penal que investiga crimes contra a ordem tributária, estelionato e peculato. É acusado de desviar verbas públicas por meio de provimentos irregulares em cargos de comissões.'
            },
            {
                processTitle: '0004448-42.2007.8.16.0004 - TJ-PR',
                processLink: '',
                processDescription: 'É réu em ação civil de improbidade administrativa movida pelo Ministério Público Estadual e pelo Estado do Paraná'
            }
        ],
            laws: [
                {
                    lawTitle: 'DCR 1/2015 - Impeachment - Câmara',
                    lawDescription: 'Denúncia por crime de responsabilidade em desfavor da Presidente da República, Dilma Vana Rousseff, pela abertura de créditos suplementares por decretos presidenciais sem autorização do Congresso Nacional e pela contratação ilegal de operações de crédito.'
                },
                {
                    lawTitle: 'PEC 358/ 2013 - Orçamento',
                    lawDescription: 'Altera os arts. 165 e 166 da Constituição Federal, para tornar obrigatória a execução da programação orçamentária que especifica. NOVA EMENTA: Altera os arts. 165, 166 e 198 da Constituição Federal, para tornar obrigatória a execução da programação orçamentária que especifica.'
                }
            ]
}

**/

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}