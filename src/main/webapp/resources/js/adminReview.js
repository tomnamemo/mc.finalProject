document.addEventListener("DOMContentLoaded", function () {
	loadReviews();
});

// 리뷰 관리 페이지 로딩
function loadReviewManagement() {
	const contentArea = document.querySelector("#main"); // 콘텐츠가 표시될 영역

	fetch(`${contextPath}/admin/reviewManagement`) // 서버에 요청
		.then((response) => response.text())
		.then((html) => {
			contentArea.innerHTML = html; // 받은 HTML을 삽입
			loadReviews(); // 리뷰 불러오기
		})
		.catch((error) => console.error("리뷰 관리 페이지 로딩 오류:", error));
}

// 리뷰 불러오기
function loadReviews() {
	fetch(`${contextPath}/api/reviews/admin/reviews`)
		.then((response) => response.json())
		.then((data) => {
			const tableBody = document.querySelector("#reviewTable tbody");
			const noReviewMessage = document.createElement("tr");
			noReviewMessage.innerHTML = `<td colspan="5" class="no-review">작성된 리뷰가 없습니다.</td>`;

			if (tableBody) {
				tableBody.innerHTML = ""; // 기존 데이터 초기화

				if (data.length > 0) {
					data.forEach((review) => {
						const row = document.createElement("tr");

						row.innerHTML = `
                            <td>${review.userId}</td>                        <!-- 작성자 ID -->
                            <td>${review.washName || "N/A"}</td>             <!-- 세차장 이름 -->
                            <td class="tal">${review.content || "내용 없음"}</td>        <!-- 리뷰 내용 표시 -->
                            <td>${review.rwvScore || "-"}</td>               <!-- 리뷰 점수 -->
                            <td>${review.crtDate ? formatDate(review.crtDate) : "-"}</td> <!-- 작성일 -->
                        `;

						tableBody.appendChild(row);
					});
				} else {
					tableBody.appendChild(noReviewMessage); // 리뷰가 없으면 메시지 표시
				}
			}
		})
		.catch((error) => console.error("리뷰 불러오기 오류:", error));
}

// 날짜 포맷
function formatDate(timestamp) {
	const date = new Date(timestamp);
	return date.toLocaleDateString("ko-KR");
}
