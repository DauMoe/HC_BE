-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2021 at 12:57 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hue_hoai`
--

-- --------------------------------------------------------

--
-- Table structure for table `excercise`
--

CREATE TABLE `excercise` (
  `excerID` int(11) NOT NULL,
  `excer_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `bmi_from` float NOT NULL DEFAULT 0,
  `bmi_to` float NOT NULL DEFAULT 0,
  `excer_url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `one` int(3) NOT NULL DEFAULT 0,
  `two` int(3) NOT NULL DEFAULT 0,
  `three` int(3) NOT NULL DEFAULT 0,
  `four` int(3) NOT NULL DEFAULT 0,
  `five` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `excercise`
--

INSERT INTO `excercise` (`excerID`, `excer_name`, `bmi_from`, `bmi_to`, `excer_url`, `description`, `one`, `two`, `three`, `four`, `five`) VALUES
(1, 'Bridge', 15, 18.5, '.\\picture\\cap-do-de\\Bridge.mp4', 'Hướng dẫn:\r\n - Năm ngửa lưng trên sàn, hai gối gập lại, lòng bàn chân để trên sàn, hai tay duỗi thẳng 2 bên hông.\r\n - Dùng lực trên bàn chân và gống cơ toàn thân, nâng người lên khỏi sàn, cho tới khi nào hông duỗi thẳng hoàn toàn, siết cứng cơ mông.\r\n - Từ từ hạ xuống và lặp lại. ', 0, 0, 1, 1, 5),
(2, 'Chair Squat', 15, 18.5, '.\\picture\\cap-do-de\\chairSquat.mp4', 'Hướng dẫn:\r\n  Đứng phía trước ghế, hai chân bằng vai, mũi chân hơi hướng ra 2 bên. Gập người ở hông và khuỵu gối xuống, hạ người về sau và hướng xuống, cho tới khi nào mông chạm vào ghế phía sau, duỗi thẳng 2 tay ra phía trước. Dùng lực gót chân, đẩy người đứng dậy và quay trở lại vị trí ban đầu', 0, 0, 0, 0, 0),
(3, 'Knee Pushup', 15, 18.5, '.\\picture\\cap-do-de\\KneePushup.mp4', 'Hướng dẫn:\r\n - Vào tư thế Plank cao, hai gối đặt trên sàn.\r\n - Duy trì 1 đường thẳng từ đầu tới gối, khuỷu 2 cùi chỏ để hạ người xuống gần chạm sàn. Giữ 2 cùi chỏ gập lại 1 góc 45 độ.\r\n - Đẩy ngược lại vị trí ban đầu.', 0, 0, 0, 0, 0),
(4, 'Stationary Lunge', 15, 18.5, '.\\picture\\cap-do-de\\StationaryLunge.mp4', 'Hướng dẫn:\r\n - Đứng hai chân dạng rộng, chân phải ở phía trước. Bàn chân ohair đặt cố định trên sàn, mũi bàn chân trái đặt trên sàn.\r\n - Khuỵu gối và nhún xuống, dừng lại khi đùi phải song song với sàn.\r\n - Đẩy ngược người đứng dậy bằng lực bàn chân phải, để quay trở lại vị trí ban đầu. Sau đó, đổi chân.', 0, 0, 0, 0, 0),
(5, 'Plank to Downward Dog', 15, 20, '.\\picture\\cap-do-de\\PlanktoDownwardDog.mp4', 'Hướng dẫn:\r\n - Vào tư thế Plank cao, hai tay chống xuống sàn, ngay dưới 2 vai, hai bàn chân đặt hơi sát vào nhau.\r\n - Gồng cứng cơ toàn thân, hai tay, chân giữ cố định. Đẩy hông lên cao và hạ xuống, vào tư thế Chó Cúi Đầu. Thân người bạn sẽ tạo thành 1 hình tam giác với mặt sàn. Giữ đầu ở vị trí trung tâm. Mắt nhìn về phía 2 chân.\r\n - Giữ yên trong 1 giây, sau đó quay trở lại tư thế Plank. Lạp lại.', 0, 0, 0, 0, 0),
(6, 'Straight-Leg Donkey Kick', 15, 20, '.\\picture\\cap-do-de\\StraightLegDonkeyKick.mp4', 'Hướng dẫn:\r\n - Vào tư thế 4 chân, hai tay dưới 2 vai, 2 gối dưới hông.\r\n - Giữ lưng thẳng, đẩy chân phải thẳng ra phía sau.\r\n - Mũi chân gập lại, hướng thẳng xuống sàn. Giữ hông cố định. Siết cứng cơ mông ở đỉnh.\r\n - Quay trở lại vị trí ban đầu. Lặp lại cho chân kia.', 0, 0, 0, 0, 0),
(7, 'Bird Dog', 15, 20, '.\\picture\\cap-do-de\\BirdDog.mp4', 'Hướng dẫn: \r\n - Vào tư thế 4 chân, đảm bảo 2 tay ở ngay dưới 2 vai, 2 gối ở dưới hông.\r\n - Giữ đầu cổ cố định, đồng thời duỗi thẳng tay trái và chân phải. Giữ hông cố định. Dừng lại ở đỉnh trong 2 giây.\r\n - Quay trở lại vị trí ban đầu. Lặp lại cho tay phải và chân trái.', 0, 0, 0, 0, 0),
(8, 'Forearm', 15, 20, '.\\picture\\cap-do-de\\ForearmPlank.mp4', 'Hướng dẫn:\r\n - Vào tư thế Plank trên cẳng tay. Thân người tạo thành 1 đường thẳng, từ đầu tới chân.\r\n - Đảm bảo hông và lưng dưới không bị xà xuống sàn. Giữ yên tư thế này trong 30-60 giây.', 0, 0, 0, 0, 0),
(9, 'Side-Lying Hip Abduction', 15, 20, '.\\picture\\cap-do-de\\SideLying.mp4', 'Hướng dẫn:\r\n - Nằm nghiêng 1 bên người, chân trái dưới, chân phải trên, hai chân duỗi thẳng.\r\n - Nâng chân phải lên, giữ người cố định.\r\n - Hạ xuống vị trí ban đầu. Lặp lại', 0, 0, 0, 0, 0),
(10, 'Bicycle Crunch', 15, 20, '.\\picture\\cap-do-de\\BicycleCrunch.mp4', 'Hướng dẫn: \r\n - Nằm ngửa lưng trên sàn, đưa 2 chân lên cao. Gập cùi chỏ và đặt 2 tay ra sau đầu.\r\n - Gập người lên và đưa cùi chỏ phải chạm vào gối trái, duỗi thẳng chân phải.\r\n - Hạ người xuống vừa phải, gập chân phải và duỗi thẳng chân trái, sau đó kéo cùi chỏ trái chạm vào gối phải. lặp lại.', 0, 0, 0, 0, 0),
(11, 'Single-Leg Bridge', 18.5, 29.9, '.\\picture\\cap-do-tb\\Single Leg Bridge Left.mp4', 'Đây là bài tập ở nhà khá khó cho nhiều người, nên bạn cần thực hiện đúng những gì video hướng dẫn nhé.', 0, 0, 0, 0, 0),
(12, 'Squat', 18.5, 29.9, '.\\picture\\cap-do-tb\\Squat.vn.mp4', 'Nếu như ở cấp độ dễ, bạn có 1 chiếc ghế để giữ thăng bằng, giúp bạn tạp đúng kỹ thuật, thì ở cấp độ này, bạn sẽ tự tập mà không có ghế.', 0, 0, 0, 0, 0),
(13, 'Pushup', 18.5, 29.9, '.\\picture\\cap-do-tb\\Push ups.vn.mp4', 'Động tác hít đất đúng kỹ thuật chắc chắn sẽ khó hơn động tác biến thể, với gối ở trên sàn.Xem video để hít đất đúng cách nhé.', 0, 0, 0, 0, 0),
(14, 'Walking Lunge', 18.5, 29.9, '.\\picture\\cap-do-tb\\Walking Lunges.mp4', 'Thay vì chỉ thực hiện động tác lunge tại chỗ, bạn sẽ phải tăng độ khó hơn một tí bằng cách thực hiện động tác bổ sung là đi.', 0, 0, 0, 0, 0),
(15, 'Pike Pushups', 18.5, 29.9, '.\\picture\\cap-do-tb\\Pike Pushup.mp4', 'Gia tăng độ khó cho bào hít đất, bằng cách đẩy người lên cao, sẽ tập trung vào vùng cơ vai nhiều hơn. Ngoài ra, động tác này còn kích thích lên sức mạnh của cơ tay, giúp giữ thăng bằng cho thân người', 0, 0, 0, 0, 0),
(16, 'Get-up Squat', 18.6, 35, '.\\picture\\cap-do-tb\\The Squat Get Up.mp4', 'Đây là động tác giúp cơ chân và mông luôn bị dồn ép dưới áp lực, nhằm đốt mỡ thừa và xây dựng cơ.', 0, 0, 0, 0, 0),
(17, 'Superman', 18.6, 35, '.\\picture\\cap-do-tb\\Superman.mp4', 'Động tác này sẽ tác động vào vùng lưng dưới và toàn bộ vùng thân người dưới của bạn.', 0, 0, 0, 0, 0),
(18, 'Plank with Alternating Leg Lift', 18.6, 35, '.\\picture\\cap-do-tb\\Plank with Leg Lift .mp4', 'Đây là động tác biến thể cho động tác Plank, giúp bạn tăng độ khó lên, khó giữ thăng bằng hơn và đòi hỏi các vùng cơ trên toàn thân người phải hoạt động tối đa để trợ giúp 4 chi.', 0, 0, 0, 0, 0),
(19, 'Kneeling Side Plank with Hip Abduction', 18.6, 35, '.\\picture\\cap-do-tb\\Side plank with hip abduction.mp4', 'Bài tập này sẽ vận dụng sức mạnh toàn thân người, giúp cơ thể giữ thăng bằng.', 0, 0, 0, 0, 0),
(20, 'Dead Bug', 18.6, 35, '.\\picture\\cap-do-tb\\Dead Bug.mp4', 'Động tác này nhằm kích thích các bó cơ toàn thân người phát triển tối đa.', 0, 0, 0, 0, 0),
(21, 'Bridge with Leg Extended', 20, 40, '.\\picture\\cap-do-nang-cao\\Bridge with Leg Extension.mp4', '', 0, 0, 0, 0, 0),
(22, 'Overhead squat', 20, 40, '.\\picture\\cap-do-nang-cao\\Overhead Squats.mp4', '', 0, 0, 0, 0, 0),
(23, 'One-legged pushup', 20, 40, '.\\picture\\cap-do-nang-cao\\One Leg Push Ups.mp4', NULL, 0, 0, 0, 0, 0),
(24, 'Jumping lunges', 20, 40, '.\\picture\\cap-do-nang-cao\\Jumping Lunge .mp4', NULL, 0, 0, 0, 0, 0),
(25, 'Elevated pike pushups', 20, 40, '.\\picture\\cap-do-nang-cao\\Pike Push Up.mp4', NULL, 0, 0, 0, 0, 0),
(26, 'Get-up squat with jump', 20, 40, '.\\picture\\cap-do-nang-cao\\Jump Squat .mp4', NULL, 0, 0, 0, 0, 0),
(27, 'Advanced Bird Dog', 20, 40, '.\\picture\\cap-do-nang-cao\\Advanced Bird Dog.mp4', NULL, 0, 0, 0, 0, 0),
(28, 'One-leg or one-arm plank', 30, 40, '.\\picture\\cap-do-nang-cao\\Single Arm Single Leg Plank.mp4', NULL, 0, 0, 0, 0, 0),
(29, 'Side plank with hip abduction', 30, 40, '.\\picture\\cap-do-nang-cao\\Side plank with hip abduction .mp4', NULL, 0, 0, 0, 0, 0),
(30, 'Hollow hold to jackknife', 30, 40, '.\\picture\\cap-do-nang-cao\\Hollow Knee Tuck .mp4', NULL, 0, 0, 0, 0, 0),
(31, 'Pull-ups', 18.5, 30, '.\\picture\\lung-va-bap-tay\\Pull ups.mp4', 'Hướng dẫn:\r\n - Hai tay nắm chắc thanh xà, lòng bàn tay hướng ra trước, cánh tay duỗi thẳng, ngửa người ra sau khoảng 30 độ.\r\n - Kéo thân lên đến khi ngực trên chạm xà, siết cơ lưng, giữ 1 giây, thở ra khi kéo lên.\r\n - Hít ào và hạ thân xuống.', 0, 0, 0, 0, 0),
(32, 'Chin-ups', 18.5, 30, '.\\picture\\lung-va-bap-tay\\Chin-Up.mp4', 'Đây là một biến thể của Pull-ups. Điểm khác biệt lớn nhất chính là lòng bàn tay nắm thanh xà của bạn hướng vào trong, về phía người.', 0, 0, 0, 0, 0),
(33, 'Wide Grip Pull-ups', 18.5, 30, '.\\picture\\lung-va-bap-tay\\Wide grip pull up.mp4', 'Cũng là pull-ups, nhưng vị trí 2 tay của bạn mở rộng hơn so với bình thường.', 0, 0, 0, 0, 0),
(34, 'Narrow Grip Pull-ups', 18.5, 30, '.\\picture\\lung-va-bap-tay\\Narrow Grip Pull Ups.mp4', 'Cũng là pull-ups nhưng ở bài này yều cầu bạn đặt 2 tay gần nhau hơn bình thường, lòng bàn tay hướng ra ngoài.', 0, 0, 0, 0, 0),
(35, 'Pull-up Hold', 18.5, 30, '.\\picture\\lung-va-bap-tay\\Pull up hold .mp4', 'Đây là bài tập cải thiện sức bền tuyệt vời nhất. Bạn chỉ cần nắm thanh xà, kéo người lên và đặt cằm mình ở trên thanh, rồi giữ nguyên vị trí đó càng lâu càng tốt. ', 0, 0, 0, 0, 0),
(36, 'Dips', 18.5, 25, '.\\picture\\nguc-va-tay-sau\\Dips   Triceps .mp4', 'Hướng dẫn:\r\n - Hai tay nắm lấy 2 thanh xà, tay hơi duỗi thẳng.\r\n - Hít vào, hạ người xuống từu từ đến khi tay trên và cẳng tay tạo thành 1 góc vuông, thân người vẫn giữ thẳng, giữ cùi chỏ sát người.\r\n - Đẩy người về vị trí ban đầu dùng lực cơ tay sau.', 0, 0, 0, 0, 0),
(37, 'Push-ups', 18.5, 25, '.\\picture\\nguc-va-tay-sau\\Push ups.mp4', 'Hướng dẫn :\r\n - Hai tay và hai chân chống xuống sàn, tay mở rộng hơn vai, thân người tao thành một đường thẳng từ đầu đến gót chân.\r\n - Hít vào, từ từ hạ người xuống cho đến khi ngực gần chạm sân.\r\n - Đẩy người trở về vị trí ban đầu, đồng thời căng cơ ngực và thở ra.', 0, 0, 0, 0, 0),
(38, 'Diamond Push-ups', 18.5, 25, '.\\picture\\nguc-va-tay-sau\\Diamond Push-Up.mp4', 'Hướng dẫn:\r\n - Tạo tư thế tương tự như khi hít đất, lưng thẳng, 2 tay để sát lại nhau, các ngón tay tạo hình cho ngón cái và ngón trỏ chạm vào nhau tạo thành hình viên kim cương, cánh tay duỗi thẳng.\r\n - Hít vào và hạ người xuống đến khi ngực gần chạm sàn.\r\n - Đẩy người về vị trí ban đầu, thở ra dứt khoát.', 0, 0, 0, 0, 0),
(39, 'Bench Dips', 18.5, 25, '.\\picture\\nguc-va-tay-sau\\Bench Dips.mp4', 'Hướng dẫn: \r\n - Đặt ghế sau lưng, đặt 2 tay lên cạnh ghế, tay mở rộng bằng vai.\r\n - Từ từ hạ thấp người, đồng thời hít vào.\r\n - Dùng lực cơ tay sau để nâng người lên và thở ra.', 0, 0, 0, 0, 0),
(40, 'Clap Push-ups', 18.5, 25, '.\\picture\\nguc-va-tay-sau\\Clapping Push Ups .mp4', 'Hướng dẫn: \r\n - Tạo tư thế hít đất, 2 tay đặt rộng hơn vai, siết cơ bụng\r\n - Từ từ hạ người xuống, cùng lúc hít vào\r\n - Duỗi thẳng tay, bật người lên, vỗ tay thật nhanh, thở ra và hạ người trở về vị trí ban đầu.', 0, 0, 0, 0, 0),
(41, 'Handstand Push-ups', 25, 35, '.\\picture\\tang-co\\Handstand Push-ups .mp4', 'Hướng dẫn:\r\n - Tựa 2 chân vào tường, tay chống xuống đất, người thẳng\r\n - HÍt vào, gống người và từu từ hạ xuống\r\n - Đẩy người lên đồng thời thở ra.', 0, 0, 0, 0, 0),
(42, 'Pike Push-ups', 25, 35, '.\\picture\\tang-co\\Pike Push-Upsl.mp4', 'Hướng dẫn:\r\n - Tạo tư thế hít đất, 2 tay mở rộng bằng vai duỗi thẳng\r\n - Đẩy hong lên co cho đến khi cả người tạo hình chữ V úp ngược, cố gắng duỗi thẳng tay và chân\r\n - Hít vào và gập cùi chỏ, hạ thân trên xuống đến khi đỉnh đầu gần chạm xuống sàn\r\n - Giữu yên vài giây, hít vào và đẩy người về vị trí ban đầu đến khi 2 tay duỗi thẳng', 0, 0, 0, 0, 0),
(43, 'Alternate Push-up Hold', 25, 35, '.\\picture\\tang-co\\AlternatePush Up Hold.mp4', 'Hướng dẫn:\r\n - Bắt đầu với tư thế Pike, 2 tay duỗi thẳng, giữ khoảng 15-20 giây\r\n - Chuyển sang tư thê hít đất thông thường, cũng giữ 15-20 giây\r\n - Kết thúc bằng một động tác Hindu Push-ups', 0, 0, 0, 0, 0),
(44, 'Decline Push-ups', 25, 35, '.\\picture\\tang-co\\Decline Push-ups.mp4', 'Hướng dẫn:\r\n - Hai tay chống xuống sàn, duỗi thẳng, 2 chân đặt trên ghế, thân người tạo thành một đường thẳng\r\n - Hít vào và hạ người xuống cho đến khi ngực gần chạm sàn\r\n - Đẩy người lên trở lại tư thế ban đầu, siết cơ ngực và thở ra dứt khoát', 0, 0, 0, 0, 0),
(45, 'Single Arm Plank', 25, 35, '.\\picture\\tang-co\\single Arm Plank.mp4', 'Hướng dẫn:\r\n - Tạo tư thế plank thấp, thân người tạo thành một đường thẳng\r\n - Giơ 1 tay ra phía trước song song với sàn\r\n - Đổi tay, mỗi bên giữ khoảng 3 giây', 0, 0, 0, 0, 0),
(46, 'Squats', 25, 40, '.\\picture\\chan\\Squat.mp4', 'Hướng dẫn:\r\n - Đứng thẳng thoải mái, 2 tay vòng ra đặt sau đầu\r\n - Từ từ hạ xuống càng sâu càng tốt, đầu gối không vượt quá mũi chân\r\n - Nâng người trở về vị trí ban đầu', 0, 0, 0, 0, 0),
(47, 'Pistol Squats', 25, 40, '.\\picture\\chan\\Pistol Squat.mp4', 'Hướng dẫn:\r\n - Đứng thẳng thoái mải, 2 chân mở rộng bằng hông, 2 tay đưa thẳng phía trước, nâng 1 chân khỏi sàn về phía trước.\r\n - Hít vào đồng thời hạ xuống đến khi đùi song song với sàn\r\n - Giữu yên 1 giây, nâng người trờ về tư thế ban đầu, thở ra', 0, 0, 0, 0, 0),
(48, 'Jump Squats', 25, 40, '.\\picture\\chan\\Jump Squat.mp4', 'Hướng dẫn:\r\n - Đứng thẳng thoái mải, chân mở rộng bằng vai\r\n - Hít vào và squat xuống đến khi đùi song song với sàn\r\n - Ấn gót chân xuống sàn, căng cơ đùi để bật nhảy lên cao hết mức có thể và thở ra khi nhảy\r\n - Khi đáp xuống lập tức squat xuống trở lại.', 0, 0, 0, 0, 0),
(49, 'Lunges', 25, 40, '.\\picture\\chan\\Lunge.mp4', 'Hướng dẫn:\r\n - Đứng thẳng, 2 chân mở hẹp hơn hông, 2 tay chống hông\r\n - Hít vào và bước chân trái lên trước, hạ người và điều chỉnh sao cho 2 gối đều tạo thành góc vuông, gối trái không vượt lên trước quá mũi chân, cẳng chân phải song song với sàn, người vẫn giữ thẳng\r\n - Thở ra, cùng lúc đẩy người lên trở về vị trí cũ, đổi chân', 0, 0, 0, 0, 0),
(50, 'Single Leg Deadlift', 25, 40, '.\\picture\\chan\\Single Leg Deadlift Left.mp4', 'Hướng dẫn:\r\n - Đứng thẳng thoái mải, 2 chân mở rộng bằng hông, nâng chân phải lên khỏi sàn, gối hơi gập, 2 tay nâng lên như đang nắm 1 thanh tạ, lòng bàn tay hướng về phía người\r\n - Khuỵu gối trái xuống, đẩy gối chân phải về phái sau đến khi gối phải ở dưới hông, cúi người, 2 tay duỗi thẳng sao cho nằm ở dưới 2 vai, thở ra khi thực hiện.\r\n - Hít vào đồng thời ấn bàn chân xuống, nâng người thẳng dậy.', 0, 0, 0, 0, 0),
(51, 'Hanging Leg Raises', 18.5, 35, '.\\picture\\co-core\\Hanging Leg Raise.mp4', 'Hướng dẫn:\r\n - Hai tay nắm thanh xà, trèo người lên, 2 tay duỗi thẳng, mở rộng bằng vai, lòng bàn tay hướng ra ngoài, chân duỗi thẳng\r\n - Nâng 2 chân lên cho đến khi vuông góc với thân người, thở ra khi thực hiện, giữ căng cứng trong vài giây\r\n - Hít vào đồng thời trở về tư thế ban đầu', 0, 0, 0, 0, 0),
(52, 'Bicycle Crunches', 18.5, 35, '.\\picture\\co-core\\Bicycle.mp4', 'Hướng dẫn:\r\n - Năm ngửa trên thảm tập, 2 tay duỗi thẳng đặt dọc sát thân người, kéo gối phải sát lên trên, chân trái nâng lên khỏi sàn, duỗi thẳng\r\n - Đổi vị trí 2 chân và lặp lại nhiều lần', 0, 0, 0, 0, 0),
(53, 'Reverse Crunch', 18.5, 35, '.\\picture\\co-core\\Reverse Crunch .mp4', 'Hướng dẫn: \r\n - Nằm ngửa trên thảm tập, 2 chân khép lại giơ lên cao, đùi vuông góc với sàn và cẳng chân song song với sàn, 2 tay đặt ra sau đầu\r\n - Nâng đầu và vai lên khỏi sàn, đồng thời kéo gối về gần phía người\r\n - Trở về vị trí cũ nhưng bàn chân không chạm sàn, vai và đầu không chạm sàn', 0, 0, 0, 0, 0),
(54, 'Side Plank', 18.5, 35, '.\\picture\\co-core\\Side Plank.mp4', 'Hướng dẫn: \r\n - Nằm nghiêng trên thảm tập, cẳng tay tựa xuống sàn, khuỷu tay nằm ngay dưới vai\r\n - Nhấc hông lên khỏi sàn, thân người tạo thành một đường thẳng\r\n - Giữu nguyên tư thế này càng lâu càng tốt và đổi bên', 0, 0, 0, 0, 0),
(55, 'Mountain Climbers', 18.5, 35, '.\\picture\\co-core\\Mountain Climbers .mp4', 'Hướng dẫn\r\n - Tạo tư thế Plank cao, cổ tay nằm ngay dưới vai, 2 tay giữ cố định\r\n - Kéo gối trái về phía ngực, Càng gần càng tốt, không để chân chạm sàn, chân phải vẫn giữ trên sàn\r\n - Ngay sau đó đẩy nhanh chân trái về vị trí cũ, đồng thời kéo gối phải về phía ngwucj, tăng dần tốc độ khi bạn đã quen hơn', 0, 0, 0, 0, 0),
(56, 'Steps', 0, 0, '\"\"', 'for steps only', 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ex_mapping`
--

CREATE TABLE `ex_mapping` (
  `ex_mappingID` int(11) NOT NULL,
  `gr_excerID` int(11) NOT NULL,
  `excerID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `ex_mapping`
--

INSERT INTO `ex_mapping` (`ex_mappingID`, `gr_excerID`, `excerID`) VALUES
(1, 1, 43),
(2, 5, 47),
(3, 1, 47);

-- --------------------------------------------------------

--
-- Table structure for table `gr_excercise`
--

CREATE TABLE `gr_excercise` (
  `gr_excerID` int(11) NOT NULL,
  `gr_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `bmi_from` float NOT NULL DEFAULT 0,
  `bmi_to` float NOT NULL DEFAULT 0,
  `thum_url` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `gr_excercise`
--

INSERT INTO `gr_excercise` (`gr_excerID`, `gr_name`, `bmi_from`, `bmi_to`, `thum_url`) VALUES
(1, 'Cấp độ dễ', 15, 18.5, '.\\picture\\gr_excer\\de.jpg'),
(2, 'Cấp độ trung bình', 18.6, 29.9, '.\\picture\\gr_excer\\tb.jpg'),
(3, 'Cấp độ nâng cao', 30, 40, '.\\picture\\gr_excer\\kho.png'),
(4, 'Bodyweight cho lưng và bắp tay', 18.5, 30, '.\\picture\\gr_excer\\lungvabaptay.jpg'),
(5, 'Bodyweight cho ngực và tay sau', 18.5, 25, '.\\picture\\gr_excer\\nguc.png'),
(6, 'Bodyweight giúp tăng cơ', 25, 35, '.\\picture\\gr_excer\\tangco.jpg'),
(7, 'Bodyweight cho chân', 25, 40, '.\\picture\\gr_excer\\chan.jpg'),
(8, 'Bodyweight cho cơ core', 18.5, 35, '.\\picture\\gr_excer\\cocore.jpg'),
(9, 'steps', 0, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `historyID` int(11) NOT NULL,
  `userID` int(11) DEFAULT NULL,
  `gr_excerID` int(3) DEFAULT NULL,
  `excerID` int(11) DEFAULT NULL,
  `starttime` datetime DEFAULT NULL,
  `endtime` timestamp NULL DEFAULT NULL,
  `calo` float NOT NULL DEFAULT 0,
  `step` int(8) DEFAULT NULL,
  `stepofday` int(10) NOT NULL DEFAULT 0,
  `distance` float NOT NULL DEFAULT 0,
  `distanceofday` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`historyID`, `userID`, `gr_excerID`, `excerID`, `starttime`, `endtime`, `calo`, `step`, `stepofday`, `distance`, `distanceofday`) VALUES
(43, 1, NULL, NULL, '2021-09-26 02:56:26', '2021-09-25 19:56:29', 0, 0, 0, 0, 0),
(44, 1, NULL, NULL, '2021-09-26 02:56:37', '2021-09-25 19:56:52', 0, 19, 19, 5.7, 5.7),
(45, 1, NULL, NULL, '2021-09-24 02:56:59', '2021-09-23 19:57:05', 0, 28, 47, 8.4, 14.1),
(46, 1, NULL, NULL, '2021-09-26 02:58:46', '2021-09-25 19:59:01', 0, 8, 55, 2.4, 16.5),
(47, 1, NULL, NULL, '2021-09-26 02:59:04', '2021-09-25 19:59:11', 0, 14, 69, 4.2, 20.7),
(48, 1, NULL, NULL, '2021-09-22 13:04:49', '2021-09-22 06:05:20', 0, 3, 3, 0.9, 0.9),
(49, 1, NULL, NULL, '2021-09-26 13:05:28', '2021-09-26 06:05:31', 0, 0, 3, 0, 0.9),
(50, 1, NULL, NULL, '2021-09-28 10:46:19', '2021-09-28 03:46:21', 0, 0, 0, 0, 0),
(51, 1, 2, 3, '2021-09-28 09:46:52', '2021-09-28 03:54:53', 0, NULL, 0, 0, 0),
(52, 1, 2, 3, '2021-09-29 09:46:52', '2021-09-28 23:54:53', 0, NULL, 0, 0, 0),
(53, 1, 2, 3, '2021-09-29 00:00:00', '2021-09-28 17:00:00', 0, NULL, 0, 0, 0),
(54, 1, NULL, NULL, '2021-10-04 07:35:06', '2021-10-04 00:35:21', 0, 10, 10, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `roles` int(2) NOT NULL DEFAULT 0,
  `username` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `step_range` float NOT NULL DEFAULT 0,
  `tall` float NOT NULL DEFAULT 0,
  `weight` float NOT NULL DEFAULT 0,
  `age` int(11) NOT NULL DEFAULT 0,
  `BMI` float DEFAULT 0,
  `ava_url` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `markbook_url` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `roles`, `username`, `password`, `step_range`, `tall`, `weight`, `age`, `BMI`, `ava_url`, `markbook_url`) VALUES
(1, 1, 'moe1', '$2b$10$Rdufns5vTJSt9bf9a6LHQ.D2FBoS5zaPYzIGxZsKrHgblm6UxqI4W', 0.3, 1.73, 78, 69, 22.5434, '', NULL),
(22, 0, 'moe12', '$2b$10$Uu6awE/NnDBVgcSha.vYVOPRR/chgbZRh0kAZWwCc.lwvEGWNfd2y', 0.25, 0, 0, 0, 0, NULL, NULL),
(45, 0, 'moe2', '$2b$10$X/xKTxyWq2HhPp0nt5l4ce7WAbgSu9rBBvRHBxcdSDZWZmIEzdNSy', 0, 0, 0, 0, 0, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `excercise`
--
ALTER TABLE `excercise`
  ADD PRIMARY KEY (`excerID`);

--
-- Indexes for table `ex_mapping`
--
ALTER TABLE `ex_mapping`
  ADD PRIMARY KEY (`ex_mappingID`),
  ADD KEY `gr_excerID` (`gr_excerID`),
  ADD KEY `excerID` (`excerID`);

--
-- Indexes for table `gr_excercise`
--
ALTER TABLE `gr_excercise`
  ADD PRIMARY KEY (`gr_excerID`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`historyID`),
  ADD KEY `userID` (`userID`) USING BTREE,
  ADD KEY `gr_excerID` (`gr_excerID`),
  ADD KEY `excerID` (`excerID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `excercise`
--
ALTER TABLE `excercise`
  MODIFY `excerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `ex_mapping`
--
ALTER TABLE `ex_mapping`
  MODIFY `ex_mappingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `gr_excercise`
--
ALTER TABLE `gr_excercise`
  MODIFY `gr_excerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `historyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ex_mapping`
--
ALTER TABLE `ex_mapping`
  ADD CONSTRAINT `FK_excer_ex_mapping` FOREIGN KEY (`excerID`) REFERENCES `excercise` (`excerID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_gr_excercise_ex_mapping` FOREIGN KEY (`gr_excerID`) REFERENCES `gr_excercise` (`gr_excerID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `FK_User_History` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_gr_excercise_History` FOREIGN KEY (`gr_excerID`) REFERENCES `gr_excercise` (`gr_excerID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `excerID` FOREIGN KEY (`excerID`) REFERENCES `excercise` (`excerID`),
  ADD CONSTRAINT `gr_excerID` FOREIGN KEY (`gr_excerID`) REFERENCES `gr_excercise` (`gr_excerID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
