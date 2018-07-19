##### The Challenge

John and his friend Jack both like to swim… but rarely at the same time.
Every third day, Jack will swim in the pool alone.
When Jack isn’t swimming, John will swim in the pool alone.
However, every 50th day, both boys will swim in the same pool.
Write some pseudocode that loops through 365 days,
and outputs who is swimming on each day starting at day 1.

##### Draft Pseudocode

~~~~pseudocode
for each day (1 - 365)
  if it is a share day
    (every 50th day)
    then output 'share'
  else if it is jacks day
    (every third day)
    then output 'jack'
  else output 'john'.
~~~~

##### Javascript Code with Output to Console

It is a small step to code this in javascript to confirm that it is correct.
To execute it, save this js code to a file and run it in node ('node myFile'):

~~~~javascript
for(let day=1; day<=365; ++day) {
  const share = day => !(day%50);
  const john = day => day%3;
  const ownere = share(day)
    ? 'Share'
    : john(day) ? 'John':'Jack';
  console.log(day + ' ' + owner);
}
~~~~

##### Generate and View an Array of 365 Daily Reservations

Finally, in order to package it nicely and present it here, I:

- added some typings to convert the javascript to typescript
- refactored the code for a more readable, functional style
- tweaked it to output to an array rather than console.log
- generalized the functionality with these parameters:
  - horizon - number of days to report (default 365)
  - shareMod - day interval for share days (default 50)
  - jackMod - day interval for jack's day (default 3)

