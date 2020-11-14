var obj = [];

loader();

async function loader() {
    var content = await Promise.all([loadDataSet()]);
    obj = content[0];
    listTable("2,2");
}

async function loadDataSet () {
    let res = await fetch("./src/json/dataset.json");
    let content;

    if (!res.ok) {
        throw new Error(`Error code: ${res.status}`);
    }

    content = await res.json();
    return content;
}

function listTable(v) {
  let tbody = '<table style="width: 100%"><tbody>';
  let p = 0;
  let d = 0;
  let c = v;
  let lop;
  c = c.split(",");

  if (c[0] * c[1] < obj.length) {
    lop = obj.length;
  } else {
    lop = c[0];
  }
  console.log(lop);

  while (p < lop) {
    tbody += "<tr>";
    for (let i = 0; i < c[1]; i++) {
      tbody +=
        '<td style="width: ' +
        100 / c[1] +
        "%; height: " +
        100 / c[0] +
        'vh"><div class="card" style="height: 100%">';
      if (d < obj.length) {
        tbody +=
          '<div class="card-img-top lazy-bg-size" style="background-image: url(src/img/1.png)">' +
          "</div>" +
          '<div class="no-warping card-img-overlay normal-state text-white">' +
          '<p class="card-text">' +
          obj[d].dept_name +
          "</p>" +
          '<p class="card-text">' +
          obj[d].dept_last_datetime +
          "</p>" +
          '<h4 style="font-size: ' +
          100 / c[0] +
          'px">' +
          obj[d].total +
          " <small>คัน</small>" +
          '<a href="javascript:;" data-toggle="modal" data-target="#my_10" title="View Info">' +
          '<i class="fas fa-car" style="color: #ff0000;"></i> </a></h4>' +
          "";
      } else {
        tbody +=
          '<div class="card-img-top lazy-bg-size" style="background-image: url(src/img/empty.png)">';
        +"</div></div></div>";
      }
      tbody += "</td>";
      d++;
      if (lop == obj.length) {
        p++;
        console.log("1");
      }
    }
    if (lop == c[0]) {
      p++;
      console.log("2");
    }
    tbody += "</tr>";
  }
  tbody += "</tbody></table>";

  document.getElementById("div-status").innerHTML = tbody;
}

function listGrid(v) {
  var c = "";
  var height = 0;
  var pfz = 0;
  var hfz = 0;
  switch (parseInt(v)) {
    case 1:
      height = 16;
      pfz = 0.7;
      hfz = 1;
      break;
    case 2:
      height = 25;
      pfz = 0.8;
      hfz = 2;
      break;
    case 4:
      height = 33;
      pfz = 1;
      hfz = 3;
      break;
    case 6:
      height = 50;
      pfz = 2;
      hfz = 5;
      break;
  }
  for (let i = 0; i < obj.length; i++) {
    c +=
      '<div class="col-xl-' +
      v +
      ' col-md-6" style="padding: 3px 1px 3px 1px; height: ' +
      height +
      'vh">' +
      '<div class="card" style="height: 100%">';

    if ((obj[i].dept_status = "Lost")) {
      c +=
        '<div class="card-img-top lazy-bg-size" style="background-image: url(src/img/cam-lost.jpg)"></div>' +
        '<div class="no-warping card-img-overlay danger-state text-white">';
    } else if ((obj[i].dept_status = "OK")) {
      c +=
        '<div class="card-img-top lazy-bg-size" style="background-image: url(src/img/cam-lost.jpg)"></div>' +
        '<div class="no-warping card-img-overlay normal-state text-white">';
    }

    c +=
      '<p class="card-text" style="font-size: ' +
      pfz +
      'em">' +
      obj[i].dept_name +
      "</p>" +
      '<p class="card-text" style="font-size: ' +
      pfz +
      'em">' +
      obj[i].dept_last_datetime +
      "</p>" +
      '<h4 class="title" style="font-size: ' +
      hfz +
      'em">' +
      obj[i].total +
      " คัน" +
      '<a href="javascript:;" data-toggle="modal" data-target="#my_10" title="View Info">' +
      '<i class="fas fa-car" style="color: #ff0000;"></i> </a></h4>' +
      "</div></div></div>";
  }
  document.getElementById("div-status").innerHTML = c;
}

