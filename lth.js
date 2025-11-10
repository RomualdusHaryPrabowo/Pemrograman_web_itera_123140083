const token = ~~[Math.random() * 123456789];

const pictures = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg',
];

function login(username, callback) {
  console.log(`sedang dalam proses login...`)
  setTimeout(() => {
    callback({ token, username });
  }, 100);
}

function getUser(token){
  if(token) return { token, username: 'hypo' }
}

function getPicture(apiKey){
  if(apiKey) return pictures
} 

const user = login(`hypo`, function(response){
  console.log(`kelar ->`, response)
})

console.log("user adalah", getUser(token))

const color = ['red', 'green', 'blue', 'yellow', 'purple'];

const [first, second] = color;
console.log(first, second);

const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john@example.com",
    address: {
      city: "Jakarta",
      postalCode: "12345"
    }
  };

const { firstName, lastName} = person;
console.log(firstName, lastName);

