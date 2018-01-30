jQuery plugin that allows make ony element on your page as "sticky".
-

See 'example/example.html'

Documentation
=
Call function using following code:

`<script>
$('#your-element').stickyElement();
</script>
`


If you want to customize your element then 
pass options inside function:

`<script>
$('#your-element').stickyElement({option1: 'value', option2: 'value'});
</script>
`

List of options that will be added when element becomes as "sticky":

`top` - offset from top in px or % (string)

`left` - offset from left in px or % (string)

`minWidht` - a minimum size of a screen in px for converting element to "sticky" (integer)

`maxWidht` - a maximum size of a screen in px for converting element to "sticky" (integer)

`addClass` - add custom class when element will "sticky" (string)

`addAttributes` - add custom attributes to element (array)

`fade` - display the element by fading them to opaque, default "true" (bool)