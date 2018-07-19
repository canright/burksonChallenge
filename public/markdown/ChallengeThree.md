##### The Challenge

Display a table of "Employees” from a JSON source
that when displayed on a desktop device looks like a table,
but looks more like a set of tiles/cards when shown on a smaller mobile device.
Bonus: Use a profile image as part of the data to display.

##### Implementation Notes

This appears to me to primarily be an exercise in CSS3 media queries.  But, I can interpret the tiles/cards thing in two different formats:

A. Show a column of cards that fill the width of the viewport.
B. Show cards that float to fill each row of the space.

So, I implemented both.

For viewport widths up to 400px, we get a column of cards each as wide as possible within the viewport (format A).

For viewport widths up to 640px, we get small cards that float as needed (format B);

For viewport widths greater than 640px, we get the grid display with a very small thumbnail of the portrait image.
It needs to be a small thumbnail here because a larger image forces each row to be too high and looks pretty ugly.

It is ironic that the smaller the display, the larger the image.
There is a good solution, which I have not implemented because it is out of scope.
That is, for the grid and floating card views, to treat the small images shown as clickable thumbnails that popup a full-sized image.

The float format has a notable weakness:  for most viewport widths, the margin on the right side of each row of thumbnails is too wide.
This is because the dom engine wraps to the next row when there is insuficient space for for another thumbnail.
This weakness might be resolved by:

- Using css media queries to layout each 'break' (eg: one layout for 3 thumbnail rows and another for 4 thumbnail rows)
- size the thumbnails based on the viewport width (which would be a different, but probably acceptable behavior.
- adjust the margins between thumbnails in a row (probably with javascript).
