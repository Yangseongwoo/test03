import { interiors } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
const cursor = document.querySelector(".cursor");
const gallery = document.querySelector(".gallery");
const numberOfItems = interiors.length; // interiors 배열의 길이로 설정
const radius = 1100;
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
const angleIncrement = (2 * Math.PI) / numberOfItems;


let isDragging = false; // 드래그 상태를 추적
let startY = 0; // 드래그 시작 Y 좌표



for (let i = 0; i < numberOfItems; i++) {
    const item = document.createElement("div");
    item.className = "item";
    const p = document.createElement("p");
    const count = document.createElement("span");
    const stuSpan = document.createElement("span"); // stu를 담을 span 요소 생성

    p.textContent = interiors[i].name; // 이름 설정
    stuSpan.textContent = interiors[i].stu; // 학생 이름 설정
    stuSpan.style.fontSize = "20px"; // stu 크기 조정 (예: 30px)
    stuSpan.style.color = "#fff"; // 필요에 따라 색상 조정
    stuSpan.style.fontWeight = "300"
    stuSpan.style.marginLeft = "10px"; // 이름과 학생 이름 간의 간격 조정

    // p 요소에 stuSpan 추가
    p.appendChild(stuSpan);
    item.appendChild(p);
    gallery.appendChild(item);

    

    const angle = i * angleIncrement;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    const rotation = (angle * 180) / Math.PI;

    // 기본 스타일 설정 (글씨 크기 작게)
    gsap.set(item, {
        x: x + "px",
        y: y + "px",
        rotation: rotation,
        opacity: 0.5, // 기본 투명도
    });

    // 항목의 글씨 크기 작게 설정
    p.style.fontSize = "30px"; // 기본 글씨 크기

    item.addEventListener("mouseover", function () {
        // 현재 항목이 위아래 중앙에 위치할 때만 작동
        const itemRect = item.getBoundingClientRect();
        const centerThreshold = 50; // 중앙에 가까운 기준값 설정
    
        if (Math.abs((itemRect.top + itemRect.height / 2) - centerY) < centerThreshold) {
            // 모든 항목의 스타일을 초기화
            document.querySelectorAll(".item").forEach((el) => {
                gsap.to(el, {
                    color: "#ccc", // 회색으로 변경
                    opacity: 0.5,  // 투명도 조정
                    duration: 0.3,
                    onComplete: () => {
                        el.querySelector('p').style.fontSize = "30px"; // 기본 크기로 설정
                    }
                });
            });
    
            // 현재 항목에 대한 스타일 적용
            gsap.to(item, {
                color: "#fff",  // 원래 색상으로 복원
                opacity: 1,     // 완전 불투명
                duration: 0.3,
            });
    
            // 글씨 크기 자연스럽게 증가
            gsap.to(item.querySelector('p'), {
                fontSize: "40px", // 원래 크기로 복원
                duration: 0.3,
                ease: "power2.out" // 부드러운 애니메이션 효과
            });
    
            // 이미지와 텍스트를 감싸는 div 생성
            const imgContainer = document.createElement("div");
            imgContainer.style.display = "flex"; // flexbox 사용
            imgContainer.style.alignItems = "flex-end"; // 수직 아래 정렬
            imgContainer.style.pointerEvents = "none"; // 마우스 이벤트 차단
            imgContainer.style.marginTop = "240px";
            imgContainer.style.marginLeft = "1420px"; // 이미지와 텍스트 간의 간격 조정
            imgContainer.style.width = "600px"; // 이미지 너비 조정
    
            const imgSrc = `./assets/img${i + 1}.jpg`;
            const img = document.createElement("img");
            img.src = imgSrc;
            img.style.width = "670px"; // 이미지 너비 조정
            img.style.height = "480px"; // 비율 유지
            img.style.marginTop = "230px";
            img.style.marginLeft = "140px"; 
            img.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)";
    
            // 이미지를 로드한 후 텍스트 위치 조정
            img.onload = () => {
                const imgHeight = img.offsetHeight;
                newText.style.marginTop = `${imgHeight}px`; // 이미지의 높이에 따라 텍스트 위치 조정
            };
    
            // 새로운 텍스트 추가
            const newText = document.createElement("p");
            newText.textContent = `${interiors[i].name} | 이름`; // 원하는 텍스트 설정
            newText.style.color = "#fff"; // 텍스트 색상
            newText.style.marginLeft = "10px"; // 이미지와 텍스트 간의 간격 조정
            newText.style.alignSelf = "flex-end"; // 텍스트 수직 아래 정렬
    
            // 컨테이너에 이미지와 텍스트 추가
            imgContainer.appendChild(img);
            imgContainer.appendChild(newText);
            cursor.innerHTML = ''; // 기존 내용을 비우고
            cursor.appendChild(imgContainer); // cursor에 이미지와 텍스트 추가
    
            // imgContainer의 위치를 조정
            const itemRect = item.getBoundingClientRect(); // 현재 항목의 위치를 가져옴
            imgContainer.style.top = `${itemRect.bottom + window.scrollY}px`; // 아래쪽으로 위치 설정
            imgContainer.style.right = `${itemRect.right}px`; // 왼쪽으로 위치 설정
    
            gsap.to(img, {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                duration: 1,
                ease: "power3.out",
            });
        }
    });
    

    item.addEventListener("mouseout", function() {
        // 현재 항목이 위아래 중앙에 위치할 때만 작동
        const itemRect = item.getBoundingClientRect();
        const centerThreshold = 50; // 중앙에 가까운 기준값 설정
    
        if (Math.abs((itemRect.top + itemRect.height / 2) - centerY) < centerThreshold) {
            const imgs = cursor.getElementsByTagName("img");
            if (imgs.length) {
                const lastImg = imgs[imgs.length - 1];
                Array.from(imgs).forEach((img, index) => {
                    if (img !== lastImg) {
                        gsap.to(img, {
                            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                            duration: 1,
                            ease: "power3.out",
                            onComplete: () => {
                                setTimeout(() => {
                                    img.remove();
                                }, 1000);
                            },
                        });
                    }
                });
    
                gsap.to(lastImg, {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.25,
                });
            }
    
            // 마우스 아웃 시 글씨 크기 원래대로 복원
            gsap.to(item.querySelector('p'), {
                fontSize: "40px", // 기본 크기로 복원
                duration: 0.3,
                ease: "power2.out" // 부드러운 애니메이션 효과
            });
        }
    });
}

function updatePosition() {
    const scrollAmount = window.scrollY * 0.00035;
    const centerThreshold = 50; // 중앙에 가까운 기준값 설정
    
    document.querySelectorAll(".item").forEach(function (item, index) {
        const angle = index * angleIncrement + scrollAmount;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const rotation = (angle * 180) / Math.PI;

        gsap.to(item, {
            duration: 0.05,
            x: x + "px",
            y: y + "px",
            rotation: rotation,
            ease: "elastic.out(1, 0.3)",
        });
    });
}

updatePosition();
document.addEventListener("scroll", updatePosition);

  // 드래그 기능 추가
  document.addEventListener("mousedown", (event) => {
    isDragging = true;
    startY = event.clientY; // 드래그 시작 Y 좌표 저장
});

/* 마우스 드래그 기능 */
document.addEventListener("mousedown", (event) => {
    isDragging = true;
    startY = event.clientY; // 드래그 시작 Y 좌표 저장
});

document.addEventListener("mousemove", (event) => {
    if (isDragging) {
        const deltaY = event.clientY - startY; // 드래그한 거리 계산
        const angleOffset = deltaY * 0.001; // 각도 변화를 위한 스케일 조정

        document.querySelectorAll(".item").forEach((item, index) => {
            const angle = index * angleIncrement + angleOffset; // 회전 각도 업데이트
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            gsap.to(item, {
                duration: 0.05,
                x: x + "px",
                y: y + "px",
                rotation: (angle * 180) / Math.PI,
                ease: "elastic.out(1, 0.3)",
            });
        });
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false; // 드래그 종료
});
});

