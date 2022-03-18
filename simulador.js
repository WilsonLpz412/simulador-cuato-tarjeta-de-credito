const d = document,
  $table = d.querySelector(".simulador-table"),
  $form = d.querySelector(".simulador-form"),
  $template = d.getElementById("simulador-template").content,
  $fragment = d.createDocumentFragment();

d.addEventListener("submit", (e) => {
  if (e.target === $form) {
    e.preventDefault();

    let rows = $table.querySelector("tbody");
    while (rows.firstChild) {
      rows.removeChild(rows.firstChild);
    }

    let $cuotas = e.target.cuotas.value;
    let $compra = e.target.compra.value;
    let $tasaMensualNominal = e.target.tasaMensualNominal.value;

    let deuda = 0;
    let intereses = 0;
    let cuota = 0;
    let pagoTotal = 0;
    let interesesMes1 = 0;
    let cuotaPromedio = 0;
    let totalPagar = 0;

    for (let i = 1; i <= $cuotas; i++) {
      if (i == 1) {
        deuda = parseInt($compra);
        intereses = 0;
        cuota = parseInt($compra) / parseInt($cuotas) + intereses;
        pagoTotal = deuda + intereses;
        interesesMes1 = deuda * ($tasaMensualNominal / 100);
      } else {
        deuda = pagoTotal - intereses - parseInt($compra) / parseInt($cuotas);
        intereses = deuda * ($tasaMensualNominal / 100) + interesesMes1;
        cuota = (parseInt($compra) / parseInt($cuotas)) + intereses;
        pagoTotal = deuda + intereses;
        interesesMes1 = 0;
      }
      totalPagar += cuota;
      $template.querySelector(".mes").textContent = i;
      $template.querySelector(".deuda").textContent = deuda.toLocaleString('es');
      $template.querySelector(".intereses").textContent = intereses.toLocaleString('es');
      $template.querySelector(".cuota").textContent = cuota.toLocaleString('es');
      $template.querySelector(".pagoTotal").textContent = pagoTotal.toLocaleString('es');

      let $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
    }

    cuotaPromedio = totalPagar / parseInt($cuotas);
    $template.querySelector(".mes").textContent = "-";
    $template.querySelector(".deuda").textContent = "-";
    $template.querySelector(".intereses").textContent = "-";
    $template.querySelector(".cuota").textContent = "Cuota Promedio";
    $template.querySelector(".pagoTotal").textContent = cuotaPromedio.toLocaleString('es');

     $clone = d.importNode($template, true);
    $fragment.appendChild($clone);

    $template.querySelector(".mes").textContent = "-";
    $template.querySelector(".deuda").textContent = "-";
    $template.querySelector(".intereses").textContent = "-";
    $template.querySelector(".cuota").textContent = "Total a Pagar";
    $template.querySelector(".pagoTotal").textContent = totalPagar.toLocaleString('es');

     $clone = d.importNode($template, true);
    $fragment.appendChild($clone);

    console.log($fragment);
    $table.querySelector("tbody").appendChild($fragment);



  }
});
