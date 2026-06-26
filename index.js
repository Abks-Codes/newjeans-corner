// ---- Idol data ----
// Single source of truth: add/edit a member here and the whole site updates.
const idols = {
  minji: {
    stageName: "Minji",
    fullName: "Kim Min-ji",
    age: 21,
    dob: "May 7, 2004",
    ethnicity: "South Korean",
    funFact: "She is the oldest member and almost debuted in a different girl group.",
    nickname: "Teddy Bear",
    emoji: "🐻",
    color: "87, 153, 252"
  },
  hanni: {
    stageName: "Hanni",
    fullName: "Pham Ngoc Han",
    age: 21,
    dob: "October 6, 2004",
    ethnicity: "Vietnamese-Australian",
    funFact: "She was the first NewJeans member cast, discovered through a global audition in Australia, years before the group officially existed.",
    nickname: "Bunny",
    emoji: "🐰",
    color: "200, 101, 197"
  },
  haerin: {
    stageName: "Haerin",
    fullName: "Kang Haerin",
    age: 19,
    dob: "May 15, 2006",
    ethnicity: "South Korean",
    funFact: "She was cast while walking home from school, with no prior plans to become an idol.",
    nickname: "Kitty Kang",
    emoji: "🐱",
    color: "126, 220, 160"
  },
  hyein: {
    stageName: "Hyein",
    fullName: "Lee Hyein",
    age: 17,
    dob: "April 21, 2008",
    ethnicity: "South Korean",
    funFact: "She had already debuted once before NewJeans in a kids' group and appeared on TV shows.",
    nickname: "Hamster",
    emoji: "🐹",
    color: "207, 84, 255"
  },
  dani: {
    stageName: "Danielle",
    fullName: "Danielle Marsh",
    age: 19,
    dob: "April 11, 2005",
    ethnicity: "Korean-Australian",
    funFact: "She had already built a childhood TV and commercial career in Korea before NewJeans debuted.",
    nickname: "Dani",
    emoji: "🌻",
    color: "239, 200, 90"
  }
};

// ---- DOM refs ----
const info = document.getElementById("details");
const emoji = document.getElementById("emoji");
const detail = document.getElementById("info");
const cards = document.querySelectorAll(".character");

// ---- Render function ----
function showIdol(key) {
  const idol = idols[key];
  if (!idol) return;

  // Fade out, swap content, fade back in
  info.classList.add("fading");

  setTimeout(() => {
    info.innerHTML = `
      <strong>Stage name:</strong> ${idol.stageName} <br>
      <strong>Full name:</strong> ${idol.fullName} <br>
      <strong>Age:</strong> ${idol.age} years old <br>
      <strong>Date of birth:</strong> ${idol.dob} <br>
      <strong>Ethnicity:</strong> ${idol.ethnicity} <br>
      <strong>Fun fact:</strong> ${idol.funFact} <br>
      <strong>Nickname:</strong> ${idol.nickname} <br>
      <strong>Emoji:</strong> ${idol.emoji}
    `;
    info.classList.remove("fading");
  }, 180);

  document.body.style.setProperty("--bg-color", idol.color);
  emoji.textContent = idol.emoji;

  cards.forEach(card => card.classList.remove("active"));
  document.getElementById(key).classList.add("active");

  detail.scrollIntoView({ behavior: "smooth", block: "center" });
}

// ---- Event wiring ----
// Click anywhere on a card (image, name, or background) to trigger it.
cards.forEach(card => {
  const key = card.dataset.idol;

  card.addEventListener("click", () => showIdol(key));

  // Keyboard accessibility: Enter/Space activates a focused card.
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      showIdol(key);
    }
  });
});

const player = document.getElementById("mv-player");
const nowPlayingTitle = document.getElementById("now-playing-title");
const songs = document.querySelectorAll(".song");

songs.forEach(song => {
  song.addEventListener("click", () => {
    const videoId = song.dataset.id;

    // Swap the embedded video
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    // Update "now playing" label
    nowPlayingTitle.textContent = song.textContent;

    // Highlight the active song
    songs.forEach(s => s.classList.remove("active"));
    song.classList.add("active");

    // Scroll player into view (handy on mobile where the list can be long)
    document.getElementById("player-wrap").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});