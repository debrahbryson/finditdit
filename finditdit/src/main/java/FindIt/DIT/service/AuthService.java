package FindIt.DIT.service;

import FindIt.DIT.dto.AuthResponse;
import FindIt.DIT.dto.LoginRequest;
import FindIt.DIT.dto.RegisterRequest;
import FindIt.DIT.entity.User;
import FindIt.DIT.enums.Role;
import FindIt.DIT.repository.UserRepository;
import FindIt.DIT.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        if (userRepository.existsByDitId(request.getDitId())) {
            throw new RuntimeException("DIT ID already registered");
        }

        if (!request.getDitId().matches("\\d{12}")) {
            throw new RuntimeException("Invalid DIT ID. Must be a 12-digit registration number.");
        }

        User user = new User(
                request.getDitId(),
                request.getFullName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                Role.STUDENT
        );
        user.setVerified(true);
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getFullName(), user.getEmail(), user.getRole().name());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getFullName(), user.getEmail(), user.getRole().name());
    }
}