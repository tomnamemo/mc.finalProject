document.addEventListener("DOMContentLoaded", function () {
	document.body.addEventListener("click", function (event) {
		if (event.target.classList.contains("update-status")) {
			const rsvnId = event.target.dataset.rsvnid;
			const status = event.target.dataset.status;

			if (status === "이용완료") {
				updateStatus(rsvnId, status, event.target);
			} else if (status === "예약취소") {
				cancelReservation(rsvnId, status, event.target);
			}
		}
	});
});

function updateStatus(rsvnId, status, button) {
	fetch(`${contextPath}/admin/updateStatus`, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: `rsvnId=${rsvnId}&status=${status}`,
	})
		.then((response) => response.text())
		.then((result) => {
			if (result === "success") {
				document.getElementById(`status-${rsvnId}`).innerText = status;
				alert(`'${status}'로 상태가 성공적으로 변경되었습니다.`);

				// 상태 변경 후 버튼 숨기기
				const buttonContainer = button.parentElement;
				buttonContainer.innerHTML = ""; // 버튼 제거
			} else {
				alert("상태 변경에 실패했습니다.");
			}
		})
		.catch(() => {
			alert("서버 오류가 발생했습니다.");
		});
}

function cancelReservation(rsvnId, status, button) {
	fetch(`${contextPath}/admin/updateStatus`, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: `rsvnId=${rsvnId}&status=${status}`,
	})
		.then((response) => response.text())
		.then((result) => {
			if (result === "success") {
				document.getElementById(`status-${rsvnId}`).innerText = status;
				alert("예약이 성공적으로 취소되었습니다.");

				// 상태 변경 후 버튼 숨기기
				const buttonContainer = button.parentElement;
				buttonContainer.innerHTML = ""; // 버튼 제거
			} else {
				alert("예약 취소에 실패했습니다.");
			}
		})
		.catch(() => {
			alert("서버 오류가 발생했습니다.");
		});
}
