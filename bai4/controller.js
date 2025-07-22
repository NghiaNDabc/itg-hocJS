var myApp = angular.module("QlbhApp", []);

myApp.filter("spaceNumber", function () {
  return function (input) {
    if (isNaN(input)) return input;
    return Number(input)
      .toFixed(2) // 2 chữ số thập phân
      .replace(/\B(?=(\d{3})+(?!\d))/g, " "); // thêm khoảng trắng
  };
});

myApp.controller("QlbhController", function ($scope, $filter) {
  $scope.list = [
    {
      id: 1,
      nam: 2021,
      loai_ke_hoach: "DS khách hàng",
      ma_khach_hang: "NS0001",
      ten_khach_hang: "Nguyễn Trần Kim A",
      ds_thang_1: 1000000,
      ds_thang_2: 950000,
      ds_thang_3: 1100000,
      ds_thang_4: 1050000,
      ds_thang_5: 1200000,
      ds_thang_6: 1150000,
      ds_thang_7: 1300000,
      ds_thang_8: 1250000,
      ds_thang_9: 1100000,
      ds_thang_10: 950000,
      ds_thang_11: 1000000,
      ds_thang_12: 1200000,
      trang_thai: "Sử dụng",
    },
    {
      id: 2,
      nam: 2021,
      loai_ke_hoach: "DS khách hàng",
      ma_khach_hang: "NS0002",
      ten_khach_hang: "Nguyễn Văn B",
      ds_thang_1: 900000,
      ds_thang_2: 1000000,
      ds_thang_3: 950000,
      ds_thang_4: 980000,
      ds_thang_5: 1020000,
      ds_thang_6: 970000,
      ds_thang_7: 1010000,
      ds_thang_8: 990000,
      ds_thang_9: 980000,
      ds_thang_10: 1030000,
      ds_thang_11: 970000,
      ds_thang_12: 950000,
      trang_thai: "Sử dụng",
    },
    {
      id: 3,
      nam: 2021,
      loai_ke_hoach: "DS khách hàng",
      ma_khach_hang: "NS0003",
      ten_khach_hang: "Nguyễn Văn C",
      ds_thang_1: 1100000,
      ds_thang_2: 1150000,
      ds_thang_3: 1120000,
      ds_thang_4: 1080000,
      ds_thang_5: 1180000,
      ds_thang_6: 1160000,
      ds_thang_7: 1200000,
      ds_thang_8: 1190000,
      ds_thang_9: 1140000,
      ds_thang_10: 1170000,
      ds_thang_11: 1130000,
      ds_thang_12: 1180000,
      trang_thai: "Sử dụng",
    },
  ];
  $scope.cur_id = 3;
  $scope.refresh = function () {
    $scope.filteredList = angular.copy($scope.list);
  };
  $scope.refresh();
  $scope.tinhTongDoanhSo = function (nv) {
    return (
      nv.ds_thang_1 +
      nv.ds_thang_2 +
      nv.ds_thang_3 +
      nv.ds_thang_4 +
      nv.ds_thang_5 +
      nv.ds_thang_6 +
      nv.ds_thang_7 +
      nv.ds_thang_8 +
      nv.ds_thang_9 +
      nv.ds_thang_10 +
      nv.ds_thang_11 +
      nv.ds_thang_12
    );
  };

  $scope.openModal = function () {
    document.getElementById("formModal").style.display = "flex";
  };
  $scope.closeModal = function () {
    document.getElementById("formModal").style.display = "none";
  };
  $scope.deleteRange = function () {
    if (!confirm("xoa?")) return;
    $scope.list = $scope.filteredList.filter(function (item) {
      return !item.checked;
    });
    $scope.refresh();
  };

  $scope.delete = function (id) {
    if (!confirm("xoa?")) return;
    $scope.list = $scope.filteredList.filter(function (item) {
      return item.id != id;
    });
    $scope.refresh();
  };
  $scope.search = function () {
    var keyword = $scope.searchKeyword.toLowerCase();
    if (keyword.trim() == "") {
      $scope.refresh();
      return;
    }
    $scope.filteredList = $scope.list.filter(
      (i) =>
        i.nam == keyword ||
        i.loai_ke_hoach.toLowerCase().includes(keyword) ||
        i.ma_khach_hang.toLowerCase().includes(keyword) ||
        i.ten_khach_hang.toLowerCase().includes(keyword)
    );
  };
  $scope.capNhatTongDS = function () {
    let tong = 0;
    for (let i = 1; i < 13; i++) {
      let key = "ds_thang_" + i;
      let value = parseFloat($scope.form[key] || 0);
      tong += value;
    }
    $scope.tong_doanh_so = tong;
  };
  $scope.check = function (input) {
    $scope.list.forEach((element) => {
      if (
        element.nam == input.nam &&
        element.loai_ke_hoach == input.loai_ke_hoach &&
        element.ma_khach_hang == input.ma_khach_hang
      )
        return false;
    });
    return true;
  };
  $scope.insert = function () {
    if ($scope.BanHangForm.$invalid) {
      alert("Vui lòng nhập đầy đủ và đúng thông tin!");
      return;
    }
    if (!$scope.check($scope.form)) {
      alert("Mỗi năm, mỗi loại kế hoạch chỉ có duy nhất 1 mã khách hàng");
      return;
    }
    $scope.form.id = $scope.cur_id;
    $scope.list.push($scope.form);
    $scope.cur_id++;
    $scope.form = {};
    $scope.refresh();
  };

  $scope.selectRow = function (id) {
    $scope.selectedId = id;
  };

  $scope.openEdit = function (id) {
    let openId;
    if (id) openId = id;
    else {
      if ($scope.selectedId < 0) return;
      openId = $scope.selectedId;
    }
    $scope.form = angular.copy(
      $scope.list.find(function (e) {
        return e.id == openId;
      })
    );
    $scope.openModal();
  };
  $scope.save = function () {
    let editIndex = $scope.list.findIndex(function (e) {
      return e.id == $scope.form.id;
    });
    $scope.list[editIndex] = angular.copy($scope.form);
    $scope.refresh();
    $scope.closeModal();
  };
  $scope.formatNumber = function (input) {
    debugger;
    if (!$scope.form[input]) {
      $scope.rawNumber = null;
      return;
    }

    // Loại bỏ mọi ký tự không phải số hoặc dấu chấm
    //const raw = $scope.form[input].toString().replace(/[^\d.]/g, '');

    const number = $scope.form[input];
    if (isNaN(number)) {
      $scope.rawNumber = null;
      return;
    }
    $scope.form[input] = Number(number)
      .toFixed(2) // 2 chữ số thập phân
      .replace(/\B(?=(\d{3})+(?!\d))/g, " "); // thêm khoảng trắng
  };

  $scope.applyFormat = function (field) {
    let val = $scope.form[field];
    if (!val) return;

    val = val.toString().replace(/[^\d.]/g, "");
    const number = parseFloat(val);

    if (!isNaN(number)) {
      $scope.form[field] = $filter("spaceNumber")(number);
      //   $scope.rawNumber[field] = number;
    }
  };
});
