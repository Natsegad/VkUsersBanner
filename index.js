import {VK} from "vk-io"

const user = new VK({
    token:"vk1.a.FpGfSoyuDQkSy75HlV3s6OX_NUG75fV1UFSeZOl23_rgt6yLzqr2O74GW6CxU_fuIaEL9IZ6WYsE6wnrdics7BoKWYZWZY8WKWxu1t99Z9WG-EjOcTP4bFGIrXt_hyqNFUnQ0wuDQcKpN8xxJlLCV-WDkoD1PG3Hls_UsscRgIfYBgZe2me5gx70G4GeQC4WGCDP8yv8Y4bmtlEQbgyCOA"
})

async function getChatUsers(chatId) {
    return await user.api.messages.getConversationMembers({
        peer_id:2000000035
    })
}

async function run() {
    const response = await getChatUsers()

    for (let userInfo in response.items){
        let banResult = user.api.account.ban(i)
    }

    console.log(response);
}

run().catch(console.log);