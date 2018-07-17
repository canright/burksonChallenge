  for (let day = 1; day <= 365; ++day) { // for each day for a year
    const share = day => !(day % 50);    // is it a share day?
    const john = day => day % 3;         // is it john's day?
    const assigne = share(day) ? 'Share' : john(day) ? 'John' : 'Jack';
    console.log(`${day} ${assigne}`);    // show the day and assigne.
  }
