import {VK} from "vk-io"

const user = new VK({
    token: "vk1.a.FpGfSoyuDQkSy75HlV3s6OX_NUG75fV1UFSeZOl23_rgt6yLzqr2O74GW6CxU_fuIaEL9IZ6WYsE6wnrdics7BoKWYZWZY8WKWxu1t99Z9WG-EjOcTP4bFGIrXt_hyqNFUnQ0wuDQcKpN8xxJlLCV-WDkoD1PG3Hls_UsscRgIfYBgZe2me5gx70G4GeQC4WGCDP8yv8Y4bmtlEQbgyCOA"
})

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function getBannedList() {
    let bannedIds = []
    let bannedList = await user.api.account.getBanned({count: 200})
    for (let index in bannedList.items) {
        bannedIds.push(bannedList.items[index])
    }
    return bannedIds
}

async function getChatUsers(chatId) {
    return await user.api.messages.getConversationMembers({
        peer_id: 2000000035
    })
}

async function getChatUsersId(charId) {
    let userIds = []
    const response = await getChatUsers(2000000035)
    for (let userInfoIndex in response.profiles) {
        userIds.push(response.profiles[userInfoIndex].id)
    }

    return userIds
}

async function ban(id) {
    return user.api.account.ban({owner_id: id})
}

async function run() {
    const chatUsersId = await getChatUsersId(2000000035)
    const banList = await getBannedList()

    for (const inde in chatUsersId) {
        const banId = banList.find((iE) => iE == chatUsersId[inde])
        if (!banId) {
            ban(chatUsersId[inde]).then((res) => {
                if (res) {
                    console.log(`user ${chatUsersId[inde]} banned`)
                }
            }).catch((err) => console.log(err))
        }
    }

    return "All user in char banned !"
}

// if (res) {
//     console.log(`user ${response.profiles[userInfoIndex].first_name} ${response.profiles[userInfoIndex].last_name} banned`)
// } else {
//     console.log(`user ${response.profiles[userInfoIndex].first_name} ${response.profiles[userInfoIndex].last_name} banned error ${res}`)
// }
run().catch(console.log);