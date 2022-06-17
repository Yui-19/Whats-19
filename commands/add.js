const Levels = require("discord-xp");

const execute = async (client,msg/*,args*/) => {

    //discord-xp
  var cmd_user=await msg.getContact();
  if(!cmd_user.isMe){
  try{
    const data =await Levels.fetch(cmd_user.id.user, "Global", false);
  var data_level=data.level
  console.log("discord-xp");
  console.log(data_level);
  }
  catch(error){
      console.log(error);
  }
}

//feature
console.log(parseInt(data_level));
if(parseInt(data_level)>=3||cmd_user.isMe){
    const chat = await msg.getChat();

    if(msg.hasQuotedMsg){
        var user=await msg.getContact();
        // var me = await client.getContactById("917042053980@c.us");
        // if(user.id._serialized=="919324708043@c.us" || msg.fromMe){
        var qm=await msg.getQuotedMessage();
        
        var contact= await qm.getContact();
        var arr=[contact.id._serialized];
        
        if(qm.type=="vcard"){
            const quoted_msg=JSON.stringify(qm);
            const index_waid=quoted_msg.indexOf("waid=");
            const number=quoted_msg.substring(index_waid+5,index_waid+5+12);
            contact= await client.getContactById(number+"@c.us");
            arr=[contact.id._serialized]
            // console.log(number);
        }
        // await chat.sendMessage(JSON.stringify(contact));
        // console.log(JSON.stringify(me));


        var me_admin=false;
        var isInGroup=false;
        var user_admin=false;
        for(let participant of chat.participants) {
            const contact2 = await client.getContactById(participant.id._serialized);
            if(contact2.isMe){
                if(user.id._serialized==contact2.id._serialized && participant.isAdmin){
                    user_admin=true;
                }
                if(participant.isAdmin||participant.isSuperAdmin){
                    me_admin=true;
                    break;
                }
                else{
                    await chat.sendMessage("Whats isn't the admin of this group");
                    break;
                }
            }
            else if(user.id._serialized==contact2.id._serialized && participant.isAdmin){
                user_admin=true;
            }
            if(contact.id._serialized==contact2.id._serialized){
                isInGroup=true;
                await chat.sendMessage("The contact you are trying to add is already added to the group");
            }
            

            
        }


        
        // if(me.isAdmin||me.isSuperAdmin){
        //     me_admin=true;
        // }
        console.log(me_admin);
        // console.log(JSON.stringify(contact));
        // console.log(number);
        if(qm.type!="vcard"){
        if(!qm.fromMe && arr.length==1 && !contact.isSuperAdmin && me_admin==true&&isInGroup==false&&user_admin==true){
            if(contact.isWAContact){
                chat.addParticipants(arr);
            }
            else{
                await chat.sendMessage("The contact you are trying to add is not a what's app contact");
            }
        }
    }
    else{
        if(!contact.isMe&&arr.length==1 && !contact.isSuperAdmin && me_admin==true&&isInGroup==false&&user_admin==true){
            if(contact.isWAContact){
                chat.addParticipants(arr);
            }
            else{
                await chat.sendMessage("The contact you are trying to add is not a what's app contact");
            }
        }

    }
        if(user_admin==false){
            await chat.sendMessage("You are not the admin of this group");
        }
        
    }
}else{
    await msg.reply("This feature unlocks at level 3\n\nType *!lvl* for your current level");
  }


};

module.exports = {
    name: 'Add',
    description: 'Add someone to the group ( admin only )',
    command: '!add',
    commandType: 'admin',
    isDependent: false,
    help: '*Add*\n\nJust use !add while quoting a message of someone you want to add\n\nUse !a while quoting a contact card to add that contact',
    execute};
