import {VK} from "vk-io"

const user = new VK({
    token: "vk1.a.FpGfSoyuDQkSy75HlV3s6OX_NUG75fV1UFSeZOl23_rgt6yLzqr2O74GW6CxU_fuIaEL9IZ6WYsE6wnrdics7BoKWYZWZY8WKWxu1t99Z9WG-EjOcTP4bFGIrXt_hyqNFUnQ0wuDQcKpN8xxJlLCV-WDkoD1PG3Hls_UsscRgIfYBgZe2me5gx70G4GeQC4WGCDP8yv8Y4bmtlEQbgyCOA"
})

async function getBannedList(){
    let bannedIds = []
    let bannedList = await user.api.account.getBanned({})
    for (let index in bannedList.items){
        bannedIds.push(bannedList.items[index])
    }
    return bannedIds
}

async function getChatUsers(chatId) {
    return await user.api.messages.getConversationMembers({
        peer_id: 2000000035
    })
}

async function run() {
    const response = await getChatUsers()
    console.log(response)

    for (let userInfoIndex in response.profiles) {
        console.log(response.profiles[userInfoIndex].id)
        getBannedList().find(res => ress != response.profiles[userInfoIndex].id)
        let banResult = user.api.account.ban({owner_id: response.profiles[userInfoIndex].id}).then((res) => {
            if (res) {
                console.log(`user ${response.profiles[userInfoIndex].first_name} ${response.profiles[userInfoIndex].last_name} banned`)
            } else {
                console.log(`user ${response.profiles[userInfoIndex].first_name} ${response.profiles[userInfoIndex].last_name} banned error ${res}`)
            }
        }).catch((err)=>{
            console.log(err)
        })

    }
}

run().catch(console.log);