shared_context "create_user_data" do
  # create user_data
  let!(:user_1) { create :user }
  let!(:user_2) { create :user }

  # create group
  let!(:group_1) { create :group }
  let!(:group_2) { create :group }
  let!(:group_3) { create :group }

  # create relation of user and group
  let!(:user_group_1) { create :user_group, user_id: user_1.id, group_id: group_1.id, role: 3 }
  let!(:user_group_2) { create :user_group, user_id: user_1.id, group_id: group_2.id, role: 2 }
  let!(:user_group_3) { create :user_group, user_id: user_1.id, group_id: group_3.id, role: 1 }
  let!(:user_group_4) { create :user_group, user_id: user_2.id, group_id: group_2.id, role: 1 }
  let!(:user_group_5) { create :user_group, user_id: user_2.id, group_id: group_3.id, role: 3 }

  # create goal
  let!(:finished_goal_1) { create :finished_goal, group_id: group_1.id }
  let!(:finished_goal_2) { create :finished_goal, group_id: group_1.id }
  let!(:unfinished_goal_1) { create :unfinished_goal, group_id: group_1.id }
  let!(:unfinished_goal_2) { create :unfinished_goal, group_id: group_2.id }

  # create task
  let!(:finished_goal_1_task_1) { create :finished_task_1, goal_id: finished_goal_1.id }
  let!(:finished_goal_1_task_2) { create :finished_task_2, goal_id: finished_goal_1.id }
  let!(:finished_goal_2_task_1) { create :finished_task_1, goal_id: finished_goal_2.id }
  let!(:finished_goal_2_task_2) { create :finished_task_2, goal_id: finished_goal_2.id }
  let!(:unfinished_goal_1_task_1) { create :unfinished_task_1, goal_id: unfinished_goal_1.id }
  let!(:unfinished_goal_2_task_1) { create :unfinished_task_1, goal_id: unfinished_goal_2.id }
  let!(:unfinished_goal_2_task_2) { create :unfinished_task_2, goal_id: unfinished_goal_2.id }

  # create relation of user and goal
  let!(:user_goal_1) { create :user_goal, user_id: user_1.id, goal_id: finished_goal_1.id, progress: 0.5 }
  let!(:user_goal_2) { create :user_goal, user_id: user_1.id, goal_id: finished_goal_2.id, progress: 0.3 }
  let!(:user_goal_3) { create :user_goal, user_id: user_1.id, goal_id: unfinished_goal_1.id, progress: 0 }
  let!(:user_goal_4) { create :user_goal, user_id: user_2.id, goal_id: finished_goal_1.id, progress: 0.9 }
  let!(:user_goal_5) { create :user_goal, user_id: user_2.id, goal_id: unfinished_goal_2.id, progress: 0.2 }

  # create relation of user and task
  let!(:user_task_1) { create :user_task, user_id: user_1.id, user_goal_id: user_goal_1.id, task_id: finished_goal_1_task_1.id, progress: 0.4 }
  let!(:user_task_2) { create :user_task, user_id: user_1.id, user_goal_id: user_goal_1.id, task_id: finished_goal_1_task_2.id, progress: 0.6 }
  let!(:user_task_3) { create :user_task, user_id: user_1.id, user_goal_id: user_goal_2.id, task_id: finished_goal_2_task_1.id, progress: 0.2 }
  let!(:user_task_4) { create :user_task, user_id: user_1.id, user_goal_id: user_goal_2.id, task_id: finished_goal_2_task_2.id, progress: 0.4 }
  let!(:user_task_5) { create :user_task, user_id: user_1.id, user_goal_id: user_goal_3.id, task_id: unfinished_goal_1_task_1.id, progress: 0 }
  let!(:user_task_6) { create :user_task, user_id: user_2.id, user_goal_id: user_goal_4.id, task_id: finished_goal_1_task_1.id, progress: 1 }
  let!(:user_task_7) { create :user_task, user_id: user_2.id, user_goal_id: user_goal_4.id, task_id: finished_goal_1_task_2.id, progress: 0.8 }
  let!(:user_task_8) { create :user_task, user_id: user_2.id, user_goal_id: user_goal_5.id, task_id: unfinished_goal_2_task_1.id, progress: 0 }
  let!(:user_task_9) { create :user_task, user_id: user_2.id, user_goal_id: user_goal_5.id, task_id: unfinished_goal_2_task_2.id, progress: 0.4 }

  # create achivements
  let!(:achievement_1) { create :achievement, user_id: user_1.id, group_id: group_1.id, goal_id: finished_goal_1.id, is_public: true, achievement_type: 2, progress: 0.5 }
  let!(:achievement_2) { create :achievement, user_id: user_1.id, group_id: group_1.id, goal_id: finished_goal_2.id, is_public: true, achievement_type: 1, progress: 0.3 }
  let!(:achievement_3) { create :achievement, user_id: user_2.id, group_id: group_2.id, goal_id: finished_goal_1.id, is_public: true, achievement_type: 1, progress: 0.9 }
end
