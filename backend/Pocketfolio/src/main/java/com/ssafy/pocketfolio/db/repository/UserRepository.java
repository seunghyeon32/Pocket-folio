package com.ssafy.pocketfolio.db.repository;

import com.ssafy.pocketfolio.db.entity.User;
import com.ssafy.pocketfolio.db.view.UserView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);

	@Query(value = "select u.name, u.profile_pic," +
			"(select count(*) from follow where user_to = u.user_seq) as follower_total," +
			"(select count(*) from follow where user_from = u.user_seq) as following_total," +
			"u.describe from user as u where user_seq = ?1", nativeQuery = true)
	Optional<UserView> findProfileById(long userSeq);

	@Query(value = "select u.name, u.profile_pic," +
			"(select count(*) from follow where user_to = u.user_seq) as follower_total," +
			"(select count(*) from follow where user_from = u.user_seq) as following_total," +
			"u.describe from user as u", nativeQuery = true)
	List<UserView> findAllProfile();

//	List<User> findByNameLikeOrderByCreated(String name);
//	List<User> findByNameLikeOrderByCreatedDesc(String name);
//	@Query
//	List<User> findByNameLikeOrderByFollowers(String name);
//	List<User> findByNameLikeOrderByFollowersDesc(String name);
//	List<User> findByNameLikeOrderByCreated(String name);
//	List<User> findByNameLikeOrderByCreated(String name);
//	List<User> findByNameLikeOrderByCreated(String name);

	int countByEmail(String email);

}
