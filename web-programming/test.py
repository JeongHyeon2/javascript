import numpy as np
from PIL import Image
import os

# 이미지 데이터셋 폴더 지정
image_folder = "./image_dataset"
image_size = (112, 92)

# 이미지 데이터를 읽어들여 numpy 배열로 변환
images = []
for filename in os.listdir(image_folder):
    filepath = os.path.join(image_folder, filename)
    with open(filepath, 'rb') as fid:
        face_image = np.fromfile(fid, dtype=np.uint8)
        face_image = np.reshape(face_image, image_size)
        images.append(face_image)        
# 이미지 데이터를 2차원 배열로 변환 (이미지 개수, 높이 * 너비)
data = np.array(images).reshape(len(images), -1)

# PCA를 수행하여 주요 주성분 추출
mean_face = np.mean(data, axis=0)
normalized_data = data - mean_face
cov_matrix = np.cov(normalized_data, rowvar=False)
eigenvalues, eigenvectors = np.linalg.eigh(cov_matrix)
sorted_indices = np.argsort(eigenvalues)[::-1]
eigenvectors = eigenvectors[:, sorted_indices]

def calculate_accuracy(num_eigenfaces, train_test_ratio):
    # 상위 n개의 eigenfaces 선택
    selected_eigenfaces = eigenvectors[:, :num_eigenfaces]
    for i in range(num_eigenfaces):
        # 각 eigenface의 최소값을 0으로, 최대값을 255로 스케일링
        eigenface = selected_eigenfaces[:, i]
        eigenface = (eigenface - np.min(eigenface)) * (255 / (np.max(eigenface) - np.min(eigenface)))
        eigenface_image = eigenface.reshape(image_size).astype(np.uint8)
        eigenface_image = Image.fromarray(eigenface_image)
        eigenface_image.save(f"eigenface_{i+1}.jpg")

    # 학습 데이터와 테스트 데이터로 나누기
    num_train = int(len(images) * train_test_ratio)
    train_data = data[:num_train]
    test_data = data[num_train:]

    # 학습 데이터의 평균 얼굴 구하기
    train_mean_face = np.mean(train_data, axis=0)

    # 각 테스트 얼굴에 대한 예측 클래스 저장
    predicted_classes = []
    for test_face in test_data:
        # 모든 학습 얼굴과의 유클리드 거리 계산
        distances = []
        for train_face in train_data:
            diff = test_face - train_face
            distance = np.linalg.norm(diff)
            distances.append(distance)

        # 가장 가까운 학습 얼굴 클래스 예측
        predicted_class = np.argmin(distances)
        predicted_classes.append(predicted_class)

    # 얼굴 인식 정확도 계산
    correct_count = sum(1 for i, p in enumerate(predicted_classes) if i == p)
    accuracy = (correct_count / len(test_data)) * 100

    return accuracy

# 각각의 eigenfaces 수와 학습 데이터 비율에 대한 정확도 계산
for num_faces in [1, 3, 5, 7, 9]:
    for train_ratio in [0.1, 0.3, 0.5, 0.7, 0.9]:
        accuracy = calculate_accuracy(num_faces, train_ratio)
        print(f"Euclidean Distance Accuracy for #eigen faces {num_faces} = {accuracy:.2f}% (Train : Test = {int(train_ratio*10)} : {int((1-train_ratio)*10)})")
