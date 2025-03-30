class_name MetalBallComponent

extends RigidBody2D

@export var rolling_friction: float = 0.05  # Reduces speed over time
@export var tilt_sensitivity: float = 1200.0  # Adjust force sensitivity

func _physics_process(delta):
	var force = Vector2.ZERO
	
	# Apply rolling friction (slows down over time)
	angular_velocity *= (1.0 - rolling_friction * delta)

	# Use accelerometer on mobile
	if OS.has_feature("mobile"):
		var tilt = Input.get_accelerometer()
		force = Vector2(tilt.x * tilt_sensitivity, 0)  # Only x-axis affects rolling
	else:
		# Use left/right arrow keys for testing in editor
		var tilt_x = Input.get_action_strength("ui_right") - Input.get_action_strength("ui_left")
		force = Vector2(tilt_x * tilt_sensitivity, 0)

	apply_central_force(force)
