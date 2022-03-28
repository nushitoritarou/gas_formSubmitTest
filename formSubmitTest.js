function main() {
    const form = createForm();
    sendForm(form);
  }
  
  function createForm(){
    const form = FormApp.create('GASテストForm');
    form.setDescription('Google Apps ScriptからFormの回答を送信するテスト');
    
    form.addTextItem().setTitle('記述式'); //記述式
    form.addParagraphTextItem().setTitle('段落'); //段落
    form.addMultipleChoiceItem().setTitle('ラジオボタン').setChoiceValues(['radio1', 'radio2','radio3']); //ラジオボタン
    form.addCheckboxItem().setTitle('チェックボックス').setChoiceValues(['check1', 'check2','check3']); //チェックボックス   
    form.addListItem().setTitle('プルダウンリスト').setChoiceValues(['pull1', 'pull2','pull3']); //プルダウンリスト
    form.addScaleItem().setTitle('均等目盛').setBounds(1, 5);//均等目盛
    form.addDateItem().setTitle('日付');//日付
    form.addTimeItem().setTitle('時刻');//時刻
    
    return form;
  }
  
  function sendForm(form) {
    const formItems = form.getItems();
  
    //汎用Itemからそれぞれ専用のItemに変換
    const formSpecificItems = formItems.map(item => getSpecificItemByType(item));
  
    //それぞれのItemに対する回答を定義
    const questionResponses = [];
    formSpecificItems.forEach(item => {
      switch(item.getIndex()){
        case 0: //記述式 TEXT
          questionResponses.push(item.createResponse('記述式テキスト回答'));
          break;
        case 1: //段落 TEXT
          questionResponses.push(item.createResponse('段落テキスト回答\n改行'));
          break;
        case 2: //ラジオ GRID
          questionResponses.push(item.createResponse('radio1'));
          break;
        case 3: //チェックボックス CHECKBOX
          questionResponses.push(item.createResponse(['check1','check3']));
          break;
        case 4: //プルダウン LIST
          questionResponses.push(item.createResponse('pull2'));
          break;
        case 5: //均等目盛 SCALE
          questionResponses.push(item.createResponse(2));
          break;
        case 6: //日付 DATE
          questionResponses.push(item.createResponse(new Date()));
          break;
        case 7: //時刻 TIME
          questionResponses.push(item.createResponse(12,10));
          break;
        default:
          break;
          
      }
    })
  
  
    //回答をFormResponse(回答フォーム)に入力
    const formResponse = form.createResponse();
    questionResponses.forEach(res => {
      formResponse.withItemResponse(res);
    })
  
  /*
   * questionResponseを逆順に入れてもちゃんとそれぞれの項目への回答は、ずれない
   *  for(let i=questionResponses.length-1;i>=0;i--){
   *    formResponse.withItemResponse(questionResponses[i]);
   *  }
   */
  
    //回答をsubmit
    formResponse.submit();
  }
  
  
  /**
   * FormItemのItemTypeに合わせたItemを返す
   * https://developers.google.com/apps-script/reference/forms/item
   */
  function getSpecificItemByType(item) {
    switch (item.getType()) {
      case FormApp.ItemType.CHECKBOX:
        return item.asCheckboxItem();
        break;
      case FormApp.ItemType.CHECKBOX_GRID:
        return item.asCheckboxGridItem();
        break;
      case FormApp.ItemType.DATE:
        return item.asDateItem();
        break;
      case FormApp.ItemType.DATETIME:
        return item.asDateTimeItem();
        break;
      case FormApp.ItemType.DURATION:
        return item.asDurationItem();
        break;
      case FormApp.ItemType.GRID:
        return item.asGridItem();
        break;
      case FormApp.ItemType.IMAGE:
        return item.asImageItem();
        break;
      case FormApp.ItemType.LIST:
        return item.asListItem();
        break;
      case FormApp.ItemType.MULTIPLE_CHOICE:
        return item.asMultipleChoiceItem();
        break;
      case FormApp.ItemType.PAGE_BREAK:
        return item.asPageBreakItem();
        break;
      case FormApp.ItemType.PARAGRAPH_TEXT:
        return item.asParagraphTextItem();
        break;
      case FormApp.ItemType.SCALE:
        return item.asScaleItem();
        break;
      case FormApp.ItemType.SECTION_HEADER:
        return item.asSectionHeaderItem();
        break;
      case FormApp.ItemType.TEXT:
        return item.asTextItem();
        break;
      case FormApp.ItemType.TIME:
        return item.asTimeItem();
        break;
      case FormApp.ItemType.VIDEO:
        return item.asVideoItem();
        break;
      case FormApp.ItemType.FILE_UPLOAD:
      default:
        return null;
    }
  }