
/**
 * 
 * @param {Node} parentSelect 
 * @param {string} optionValue 
 * @param {string} optionTextContent 
 * @param {boolean} isOptionSelected 
 * 
 * add a new option(optionValue,optionTextContent,isOptionSelected) to its parent
 * node --- parentSelect
 */
function addOption(parentSelect,optionValue,optionTextContent,isOptionSelected=false){
  const option = document.createElement("option");
  option.value = optionValue;
  option.textContent = optionTextContent;
  if(isOptionSelected){
    option.selected=true;
  }
  parentSelect.appendChild(option);
}

async function getChannelData(){
  const select = document.querySelector(".form-select");
  select.innerHTML = "";

  const res = await axios({
    url: "/v1_0/channels",
  });

  addOption(select, "", "请选择文章频道",true);

  const channels = res.data.data.channels;
  for(const channel of channels){
    addOption(select,channel.id,channel.name);

  }
}


getChannelData();

