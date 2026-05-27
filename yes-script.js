let musicPlaying = false
let music
const musicTimeKey = 'loveStoryMusicTime'

window.addEventListener('DOMContentLoaded', () => {
    launchConfetti()

    // Autoplay music (works since user clicked Yes to get here)
    music = document.getElementById('bg-music')
    music.volume = 0.3
    music.addEventListener('loadedmetadata', restoreMusicTime)
    music.addEventListener('timeupdate', saveMusicTime)
    playMusic().catch(() => setMusicPlaying(false))
    setTimeout(() => {
        if (music.paused) setMusicPlaying(false)
    }, 100)
})

function setMusicPlaying(isPlaying) {
    musicPlaying = isPlaying
    document.getElementById('music-toggle').textContent = isPlaying ? '🔊' : '🔇'
}

function playMusic() {
    music.muted = false
    return music.play().then(() => setMusicPlaying(true))
}

function restoreMusicTime() {
    const savedTime = Number(localStorage.getItem(musicTimeKey))
    if (Number.isFinite(savedTime) && savedTime > 0 && savedTime < music.duration - 1) {
        music.currentTime = savedTime
    }
}

function saveMusicTime() {
    if (Number.isFinite(music.currentTime)) {
        localStorage.setItem(musicTimeKey, String(music.currentTime))
    }
}

window.addEventListener('beforeunload', saveMusicTime)

function launchConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffb3c1', '#ff0000', '#ff6347', '#fff', '#ffdf00']
    const duration = 6000
    const end = Date.now() + duration

    // Initial big burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors
    })

    // Continuous side cannons
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        })

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        })
    }, 300)
}

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        setMusicPlaying(false)
    } else {
        playMusic().catch(() => setMusicPlaying(false))
    }
}
