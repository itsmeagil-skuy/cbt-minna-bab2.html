const vocab = [
  { jp:"これ", arti:"ini" },
  { jp:"それ", arti:"itu" },
  { jp:"あれ", arti:"yang itu" },
  { jp:"この", arti:"ini (penunjuk)" },
  { jp:"その", arti:"itu (penunjuk)" },
  { jp:"あの", arti:"yang itu (penunjuk)" },
  { jp:"ほん", arti:"buku" },
  { jp:"じしょ", arti:"kamus" },
  { jp:"ざっし", arti:"majalah" },
  { jp:"しんぶん", arti:"koran" },
  { jp:"ノート", arti:"buku tulis" },
  { jp:"てちょう", arti:"buku catatan" },
  { jp:"めいし", arti:"kartu nama" },
  { jp:"カード", arti:"kartu" },
  { jp:"テレホンカード", arti:"kartu telepon" },
  { jp:"えんぴつ", arti:"pensil" },
  { jp:"ボールペン", arti:"pulpen" },
  { jp:"シャープペンシル", arti:"pensil mekanik" },
  { jp:"かぎ", arti:"kunci" },
  { jp:"とけい", arti:"jam" },
  { jp:"かさ", arti:"payung" },
  { jp:"かばん", arti:"tas" },
  { jp:"くつ", arti:"sepatu" },
  { jp:"くつした", arti:"kaos kaki" },
  { jp:"ネクタイ", arti:"dasi" },
  { jp:"シャツ", arti:"kemeja" },
  { jp:"ズボン", arti:"celana" },
  { jp:"コート", arti:"mantel" },
  { jp:"ちず", arti:"peta" },
  { jp:"じどうしゃ", arti:"mobil" },
  { jp:"じてんしゃ", arti:"sepeda" },
  { jp:"おみやげ", arti:"oleh-oleh" },
  { jp:"シーディー", arti:"CD" },
  { jp:"チョコレート", arti:"cokelat" },
  { jp:"コーヒー", arti:"kopi" },
  { jp:"えいご", arti:"bahasa Inggris" },
  { jp:"にほんご", arti:"bahasa Jepang" },
  { jp:"だれ", arti:"siapa" },
  { jp:"だれの", arti:"milik siapa" },
  { jp:"いくら", arti:"berapa harga" },
  { jp:"こちら", arti:"ini (sopan)" },
  { jp:"どうぞ", arti:"silakan" }
];

function shuffle(arr){
  return arr.sort(()=>Math.random()-0.5);
}

// 🔥 ACAK VOCAB
const shuffled = shuffle([...vocab]);

// ✨ BAGI 2
const jpToArti = shuffled.slice(0,25);
const artiToJp = shuffled.slice(25,50);

// 🎯 BUAT SOAL
let questions = [];

// 25 soal Jepang → arti
jpToArti.forEach(v=>{
  questions.push({
    q: `Arti dari 「${v.jp}」 adalah`,
    correct: v.arti,
    options: shuffle(
      vocab.map(x=>x.arti).filter(a=>a!==v.arti)
    ).slice(0,2).concat(v.arti)
  });
});

// 25 soal arti → Jepang
artiToJp.forEach(v=>{
  questions.push({
    q: `Kata Jepang dari "${v.arti}" adalah`,
    correct: v.jp,
    options: shuffle(
      vocab.map(x=>x.jp).filter(j=>j!==v.jp)
    ).slice(0,2).concat(v.jp)
  });
});

// 🔀 ACAK URUTAN SOAL
questions = shuffle(questions);

// ===== RENDER =====
const form = document.getElementById("quizForm");

questions.forEach((q,i)=>{
  const d = document.createElement("div");
  d.className = "question";
  d.innerHTML =
    `<p>${i+1}. ${q.q}</p>` +
    shuffle(q.options).map(o =>
      `<label><input type="radio" name="q${i}" value="${o}"> ${o}</label>`
    ).join("");
  form.appendChild(d);
});

// ===== CEK NILAI =====
function checkScore(){
  let benar = 0;

  questions.forEach((q,i)=>{
    const pilih = document.querySelector(`input[name=q${i}]:checked`);
    const semua = document.querySelectorAll(`input[name=q${i}]`);

    semua.forEach(x=>{
      if(x.value===q.correct) x.parentElement.classList.add("correct");
      if(pilih && x===pilih && x.value!==q.correct)
        x.parentElement.classList.add("wrong");
    });

    if(pilih && pilih.value===q.correct) benar++;
  });

  const nilai = Math.round((benar/questions.length)*100);
  document.getElementById("result").innerHTML =
    `Benar: <b>${benar}</b> / ${questions.length}<br>
     Nilai: <b>${nilai}</b><br>
     Status: <b>${nilai>=85?'LULUS ✅':'TIDAK LULUS ❌'}</b>`;
}

function goFullScreen(){
  document.documentElement.requestFullscreen();
}
