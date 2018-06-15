const getTime = (range) => {
    const toUnixDateNow = Date.now() // unix

    const live = new Date(toUnixDateNow)
    //const today1 = new Date(toUnixDateNow)
    //const today2 = new Date(toUnixDateNow)
    const interval = 1000 * 60 * 60 * 24; // 24 hours in milliseconds


    return live

    //const fromUnixDate = new Date(dateNow * 1000)
    // const Year = Data.getFullYear()
    // const Month = Data.getMonth()
    // const Day = Data.getDate()
    // const Hour = Data.getHours()
    // const Minutes = Data.getMinutes()
    // const Seconds = Data.getSeconds()

// console.log(`${Day}/${Month}/${Year}-${Hour}:${Minutes}`)
  }
  export default getTime