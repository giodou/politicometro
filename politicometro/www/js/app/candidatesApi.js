/** candidateTypes = [
    {
        typeId: 1,
        type: 'Deputado estadual'
    },
    {
        typeId: 2,
        type: 'Deputado federal'
    },
    {
        typeId: 3,
        type: 'Senador'
    }
,
    {
        typeId: 4,
        type: 'Governador'
    }
]

**/

function LoadAllCandidates() {
    return [
        ...LoadDeputadosEstaduais(),
        ...LoadDeputadosFederais(),
        ...LoadSenadores(),
        ...LoadGovernadores()
    ]
}

function LoadDeputadosFederais() {
    return [
        {
            candidateId: 1,
            candidateType: 2,
            candidateParty: 'PPS - PR',
            candidateImg: 'http://manager.politicos.org.br/files/viewer?file=936db4cc-6fb7-45e0-8ef2-c6a1b0dfb2c4.jpg&directory=parliamentarian',
            candidateName: 'Rubens Bueno',
            totalLike: 220,
            totalUnLike: 560,
            likedByUser: true
        },
        
        {
            candidateId: 2,
            candidateType: 2,
            candidateParty: 'PSD - PR',
            candidateImg: 'http://manager.politicos.org.br/files/viewer?file=dc4846f3-ba8f-4d8c-86df-13ff9e00d535.jpg&directory=parliamentarian',
            candidateName: 'Sandro Alex',
            totalLike: 550,
            totalUnLike: 460,
            likedByUser: true
        },

        {
            candidateId: 9,
            candidateType: 2,
            candidateParty: 'PSC - PR',
            candidateImg: 'http://manager.politicos.org.br/files/viewer?file=b82346df-0ff5-4e3f-a4d8-0642970669ee.jpg&directory=parliamentarian',
            candidateName: 'HIDEKAZU TAKAYAMA',
            totalLike: 13,
            totalUnLike: 2650,
            likedByUser: false
        },
    ]
}

function LoadDeputadosEstaduais() {
    return [
        {
            candidateId: 3,
            candidateType: 1,
            candidateParty: 'PPS - PR',
            candidateImg: 'http://manager.politicos.org.br/files/viewer?file=936db4cc-6fb7-45e0-8ef2-c6a1b0dfb2c4.jpg&directory=parliamentarian',
            candidateName: 'Rubens Bueno',
            totalLike: 220,
            totalUnLike: 560,
            likedByUser: true
        },
        {
            candidateId: 4,
            candidateType: 1,
            candidateParty: 'PSD - PR',
            candidateImg: 'http://manager.politicos.org.br/files/viewer?file=dc4846f3-ba8f-4d8c-86df-13ff9e00d535.jpg&directory=parliamentarian',
            candidateName: 'Sandro Alex',
            totalLike: 550,
            totalUnLike: 460,
            likedByUser: true
        }
    ]
}

function LoadSenadores() {
    return [
        {
            candidateId: 5,
            candidateType: 3,
            candidateParty: 'PPS - PR',
            candidateImg: 'http://manager.politicos.org.br/files/viewer?file=936db4cc-6fb7-45e0-8ef2-c6a1b0dfb2c4.jpg&directory=parliamentarian',
            candidateName: 'Rubens Bueno',
            totalLike: 220,
            totalUnLike: 560,
            likedByUser: true
        },
        {
            candidateId: 6,
            candidateType: 3,
            candidateParty: 'PSD - PR',
            candidateImg: 'http://manager.politicos.org.br/files/viewer?file=dc4846f3-ba8f-4d8c-86df-13ff9e00d535.jpg&directory=parliamentarian',
            candidateName: 'Sandro Alex',
            totalLike: 550,
            totalUnLike: 460,
            likedByUser: true
        }
    ]
}

function LoadGovernadores() {
    return [
        {
            candidateId: 7,
            candidateType: 4,
            candidateParty: 'PPS - PR',
            candidateImg: 'http://manager.politicos.org.br/files/viewer?file=936db4cc-6fb7-45e0-8ef2-c6a1b0dfb2c4.jpg&directory=parliamentarian',
            candidateName: 'Rubens Bueno',
            totalLike: 220,
            totalUnLike: 560,
            likedByUser: true
        },
        {
            candidateId: 8,
            candidateType: 4,
            candidateParty: 'PSD - PR',
            candidateImg: 'http://manager.politicos.org.br/files/viewer?file=dc4846f3-ba8f-4d8c-86df-13ff9e00d535.jpg&directory=parliamentarian',
            candidateName: 'Sandro Alex',
            totalLike: 550,
            totalUnLike: 460,
            likedByUser: true
        }
    ]
}

function GetCandidateInfo() {
    return [
        {
            candidateId: 1,
            openProcess: [],
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
        },

        {
            candidateId: 2,
            openProcess: [],
            laws: [
                {
                    lawTitle: 'EMP 1/ 2017 => PL 5587/ 2016 - Uber - Câmara',
                    lawDescription: 'O texto principal do projeto, aprovado antes da emenda, estabelecia que caberia às prefeituras regulamentar serviços como o do Uber. Mas a emenda, aprovada por 226 votos a 182, retira do projeto o trecho que estabelece que transporte individual de passageiros é uma atividade de natureza privada, transformando em atividade pública. O destaque aprovado impõe ainda uma idade máxima para os veículos, a necessidade de autorização específica emitida pelo poder público municipal quanto ao local da prestação do serviço, e certificado de registro do veículo em nome do motorista e placa vermelha. A pontuação neste caso é para esta emenda votada na Câmara. Falta ser aprovada pelo Senado.'
                },
                {
                    lawTitle: 'PDC 886/2018 - Intervenção federal no RJ',
                    lawDescription: 'A Câmara dos Deputados aprovou o decreto do presidente Michel Temer (MDB) que determinou intervenção federal na segurança pública do Estado do Rio de Janeiro. A medida teve 340 votos favoráveis, 72 contrários e uma abstenção.'
                }
            ]
        },
        
        {
            candidateId: 9,
            openProcess: [
                {
                    processTitle: '647/2011 - STF',
                    processLink: 'http://portal.stf.jus.br/processos/detalhe.asp?incidente=4160986',
                    processDescription: 'É réu em ação penal que investiga crimes contra a ordem tributária, estelionato e peculato. É acusado de desviar verbas públicas por meio de provimentos irregulares em cargos de comissões.'
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
        },
    ]
}