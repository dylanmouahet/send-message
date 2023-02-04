$("form#beform").on("submit", function(e) {
    e.preventDefault();
    $("#loading-wrapper").show();
    const form = e.target;
    // Post data using the Fetch API
    fetch(form.action, {
            method: (form.method) ? form.method : 'POST',
            body: new FormData(form)
        })
        // We turn the response into text as we expect HTML
        .then(res => res.text())

    // Let's turn it into an HTML document
    .then((response) => {
            // console.log(response);
            let responseParse = JSON.parse(response);
            let re_message = responseParse.message;
            let url_run = responseParse.url;
            if (responseParse.success == true) {
                if (url_run == '1') {
                    form.reset();
                    notif(re_message, 'success');
                } else if (url_run == '2') {
                    $('.ui.modal').modal('hide');
                    // document.location.reload(true);
                    form.reset();
                    return false;
                } else if (url_run == 4) {
                    $('.ui.modal').modal('hide');
                    $('#' + re_message).DataTable().ajax.reload();
                    $('.' + re_message).DataTable().ajax.reload();
                    notif(re_message, 'success');
                    // document.location.reload(true);
                    form.reset();
                    return false;
                } else {
                    notif(re_message, 'success');
                    form.reset();
                }

            } else {
                notif(re_message, 'error');
                $("#loading-wrapper").hide();
            }
            if (url_run !== 0 && url_run !== 1) {
                window.location.href = url_run;
            }

        })
        // Now we have a document to work with let's replace the <form>
        // .then(doc => {
        //     alert(res.text());

    // })
    .catch(err => {
        // Some form of connection failure
        console.error(err);
        $("#loading-wrapper").hide();
        notif("Une erreur est survenue. Veuillez contacter le support", 'error');
        // form.querySelector('[role=alert]').hidden = false;
    });
    // alert("ENvoir du formulaire");
});

function callLoader(status) {
    $(function() {
        if (status !== 4) {
            $("#loading-wrapper").show();
        } else {
            $("#loading-wrapper").hide();
        }

    });
}

$(document).ready(function() {
    $('#loading-wrapper').hide();
})

function notif(message, type) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "slideDown",
        "hideMethod": "fadeOut"
    };
    toastr[type](message);
}

function ajaxDataGet(url, data = [], type = 'GET') {
    $("#loading-wrapper").show();
    response = {};
    return $.ajax({
        url: url,
        type: type,
        data: data,
        dataType: 'json',
        success: function(data) {
            response.status = true;
            response.data = data.datas;
            return response;
        },
        error: function(jqXhr, textStatus, errorMessage) {
            response.status = false;
            return response;
        },
    });

}

function getStatusDa(status) {
    switch (status) {
        case 1:
        case "1":
            return '<span class="badge badge-info">En Cours</span>';
            break;
        case 2:
        case "2":
            return '<span class="badge badge-dark">En Attente</span>';
            break;
        case 3:
        case "3":
            return '<span class="badge badge-secondary">Rejetée</span>';
            break;
        case 4:
        case "4":
            return '<span class="badge badge-danger">Commande</span>';
            break;
        case 5:
        case "5":
            return '<span class="badge badge-Primary">Livrée</span>';
            break;
    }
}

function getStatusCommande(data) {
    if (data.TYPARTRA == "A" && data.ANNU != 1 && data.DTEL == null) {
        return '<span class="badge badge-info">En Cours</span>';
    } else if (data.ANNU == 1) {
        return '<span class="badge badge-secondary">Annulé</span>';
    } else if (data.DTEL != null) {
        return '<span class="badge badge-success">Exécuté</span>';
    } else {}
}

function getStatusCommandeTravaux(data) {
    if (data.TYPARTRA == "P" && data.ANNU != 1 && data.DTEL == null) {
        return '<span class="badge badge-info">En Cours</span>';
    } else if (data.ANNU == 1) {
        return '<span class="badge badge-secondary">Annulé</span>';
    } else if (data.DTEL != null) {
        return '<span class="badge badge-success">Exécuté</span>';
    } else {}
}

function getStatusFacture(data) {
    if (data.CODANNUL == 1) {
        return '<span class="badge badge-secondary">Annulé</span>';
    }

    if (data.RESTREGLE <= 0) {
        return '<span class="badge badge-success">Payé</span>';
    }

    if (data.RESTREGLE > 0) {
        return '<span class="badge badge-info">En attente de règlement</span>';
    }
}

function getDecompteStatus(data) {
    if (data.NUMFAC == "" || data.NUMFAC == null) {
        return "<span class='badge badge-info'>En attente d'établissemment de la facture </span>";
    } else {
        return "<span class='badge badge-success'>Facture établie </span>";
    }
}

function getTypeFacture(data) {
    if (data == 1) {
        return 'Démarrage';
    }

    if (data == 2) {
        return 'Décompte';
    }
}

function getModeReglement(data) {
    switch (data) {
        case 1:
            return "Espèces";
            break;
        case 2:
            return "Chèque";
            break;
        case 3:
            return "Virement";
            break;
        case 3:
            return "Carte bancaire";
            break;

        default:
            return "Autre";
            break;
    }
}

function getUniteArticle(unite) {
    switch (unite) {
        case 1:
            return "Unité";
            break;
        case 2:
            return "Litre";
            break;
        case 3:
            return "Kg";
            break;
        case 4:
            return "Mètre";
            break;
        case 5:
            return "M2";
            break;
        case 6:
            return "M3";
            break;
        default:
            return "";
            break;
    }
}

function getTypePaiement(type) {
    switch (type) {
        case 1:
            return "Espèce";
            break;
        case 2:
            return "Chèque";
            break;
        case 3:
            return "Virement";
            break;
        case 4:
            return "Carte bancaire";
            break;
        case 5:
            return "Autre";
            break;
        default:
            return "";
            break;
    }
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    date = new Date(date);
    return [
        padTo2Digits(date.getDate() + 1),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
    // switch (entite_connected) {
    //     case "energie":
    //         let year = date.substr(0, 4);
    //         let month = date.substr(-5, 2);
    //         let day = date.substr(-3, 2);

    //         let result = day + "/" + month + "/" + year;
    //         return result;

    //     default:
    //         date = new Date(date);
    //         return [
    //             padTo2Digits(date.getDate() + 1),
    //             padTo2Digits(date.getMonth() + 1),
    //             date.getFullYear(),
    //         ].join('/');
    // }

}

$('table').on('mouseover', 'tbody tr', function() {
    $(this).css("cursor", "pointer");
});

//Close menu on overlay click
$('.screen-overlay').on('click', function() {
    $(this).toggleClass('show');
    $('.quick-links-box').toggleClass('quick-links-box-show');
    $('body').css('overflow', 'auto');

});

//Change screen overlay cursor
$('.screen-overlay').on('mouseover', function() {
    $(this).css("cursor", "default");
});

var moneyFormat = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
});

function formatMoneyWithCurrency(devise) {
    return moneyFormatWithoutDevise = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: devise,
    });
}


function cleanMoneyForCalcul(money) {
    money = money.replace(/[\FCFA,]/g, '');
    money = money.replace(/[\CFA,]/g, '');
    money = money.replace(/[/\s/,]/g, '');
    return money;
}

function ajaxDataPost(url, s_data = {}, type = 'POST') {
    // console.log('sending....')
    $("#loading-wrapper").show();
    response = {};
    return $.ajax({
        url: url,
        type: type,
        data: s_data,
        dataType: 'json',
        success: function(r_data) {
            response.status = true;
            response.data = r_data.datas;
            return response;
        },
        error: function(jqXhr, textStatus, errorMessage) {
            console.log(errorMessage);
            console.log(jqXhr);
            console.log(textStatus);
            response.status = false;
            return response;
        },
    });

}

function getEmptySelectLibelle(libelle) {
    if (libelle == null || libelle == "") {
        return "Sans libellé";
    } else {
        return libelle;
    }
}

//passage au format numérique pour calcul
function formatWithoutCurrency(money) {
    let num = money.toString().includes(".") ?
        money.toString().split(".")[0] :
        money.toString();
    let len = num.toString().length;
    let result = "";
    let count = 1;
    // On boucle sur le nombre pour le formater
    for (let i = len - 1; i >= 0; i--) {
        result = num.toString()[i] + result;
        if (count % 3 === 0 && count !== 0 && i !== 0) {
            result = " " + result;
        }
        count++;
    }

    // On remet la virgule s'il y a lieu
    if (money.toString().includes(".")) {
        result = result + "." + money.toString().split(".")[1];
    }
    if (money.toString().includes(",")) {
        result = result + "." + money.toString().split(",")[1];
    }

    // On ajoute le symbole de la devise
    let formattedMoney = result;

    return formattedMoney;
}