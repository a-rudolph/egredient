export default search = name => {
  fetch("https://api.scryfall.com/cards/search?q=" + name)
    .then(resp => {
      return resp.text();
    })
    .then(body => {
      let parsed = JSON.parse(body);
      console.log(parsed);
      let img = parsed.data[0].image_uris.small;
      this.setState({ img });
    });
  return [{ card }];
};
