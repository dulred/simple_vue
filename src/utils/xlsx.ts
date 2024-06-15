import fs from "file-saver"
import XLSX  from "xlsx"

// 导出excel文件
// 该方法需要传3个参数,分别是:json格式的数据，表头对象，文件名
export function xlsx(json,fields,filename=".xlsx"){
    //导出xlsx
    json.forEach((item)=>{
        for(let i in item){
            if(fields.hasOwnProperty(i)){
                item[fields[i]] = item[i];
            }
            delete item[i] //删除原先的对象属性
        }
    })
    let sheetName = filename;//删除原先的对象属性
    let wb = XLSX.utils.book_new()
    let ws = XLSX.utils.json_to_sheet(json,{header:Object.values(fields)})
    wb.SheetNames.push(sheetName)
    wb.Sheets[sheetName] =ws
    const defaultCellStyle = {
        font: {name:"Verdana",sz:13,color:"FF00FF88"},
        fill:{fgColor:{rgb:"FFFFAA00"}}
    }
    let wopts = {
        bookType:"xlsx",
        bookSST:false,
        type:"binary",
        cellStyles:true,
        defaultCellStyle:defaultCellStyle,
        showGridLines:false
    }
    let wbout = XLSX.write(wb,wopts)
    let blob  = new Blob ([s2ab(wbout)],{type:"application/octet-stream"})
    fs.saveAs(blob,filename + ".xlsx")
}

const s2ab = (s) => {

}