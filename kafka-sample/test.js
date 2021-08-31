

Object userId = "";
//paramMap.put("USERID", "");	//기존 소스 USERID 를 빈값으로 넣었다. 해당 페이지의 SP_UT001_L4 로 검색
paramMap.put("USERID", userId);	//기존 소스 USERID 를 빈값으로 넣었다. 해당 페이지의 SP_UT001_L4 로 검색
function sheetH_Save() {

    if (sheetH.CheckedRows("H_YN") <= 0) {
        alert("선택된 데이터가 없습니다.");
        return false;
    }

    if(!confirm('저장 하시겠습니까?')){
        return;
    }

    var rowData = sheetH.GetSaveJson(0);
    var rowCntH = sheetH.RowCount();
    var cnt = 0;
    for (i = 1;i<=rowCntH;i++){
        rtnData = sheetH.GetRowData(i);
        chkYn = sheetH.GetCellValue(i,"H_YN");
        if (chkYn > 0){
            var MENUKY = sheetH.GetCellValue(i,"MENUKY");
            rowData["data"][cnt].MENUKY = MENUKY;
            cnt++;
        }
    }


    var sendData = {
        "gridData" : rowData
        , "topaut" : menuParam.TOPAUT
    };

    netUtil.DoSave({
        url : "/wms/system/json/SP_UT001_U.data",
        param : sendData,
        rstFunction : function(jsonData, rst) {
            commonUtil.msg(jsonData.rtnMsg.rstMsg, rst);
            returnData3.data = jsonData.rtnMsg.dataList;
            searchInit(menuParam);
        }
    });

    return false;
}


==============================
function sheetC_Save() {

    if (sheetC.CheckedRows("CheckBox") <= 0) {
        alert("선택된 데이터가 없습니다.");
        return false;
    }

    if(!confirm('완료 하시겠습니까?')){
        return;
    }

    var rowData = sheetC.GetSaveJson(0);
    //유효성체크
    /*  		if (rowData.Message == 'KeyFieldError') {
                return false;
            } else if (rowData.data.length == 0
                    || rowData.Message == 'NoTargetRows') {

                alert('저장할 데이터가 없습니다.');
                return false;
            }
     */

    var rowCntC = sheetC.RowCount();
    var cnt = 0;
    for (i = 1;i<=rowCntC;i++){
        rtnData = sheetC.GetRowData(i);
        chkYn = sheetC.GetCellValue(i,"CheckBox");
        if (chkYn > 0){
            var preMENUKY = sheetC.GetCellValue(i-1,"MENUKY");
            var preMENUID = sheetC.GetCellValue(i-1,"MENUID");
            console.log("preMENUKY : "+ preMENUKY)
            console.log("preMENUID : "+ preMENUID)

            rowData["data"][cnt].preMENUKY = preMENUKY;
            rowData["data"][cnt].preMENUID = preMENUID;
            var MENULV = rowData["data"][cnt].MENULV;
            if (MENULV == 1 || MENULV == 2) {
                rowData["data"][cnt].PGPATH = "";
            }
            cnt++;
        }
    }

    var newRow = sheetH.GetSelectRow();
    var rtnData = sheetH.GetRowData(newRow);

//		console.log(" dataLength0 : "+rowData["data"].length)	//check 개수
//		var getSheetData = sheetC.GetSaveJson(1);				//전체개수

    var sendData = {
        "gridData" : rowData
        , "topaut" : menuParam.TOPAUT
    };

    netUtil.DoSave({
        url : "/wms/system/json/SP_UT001_U3.data",
        param : sendData,
        rstFunction : function(jsonData, rst) {
            commonUtil.msg(jsonData.rtnMsg, rst);
            searchSheetC(rtnData);
        }
    });

    return false;
}