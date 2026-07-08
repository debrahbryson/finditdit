package FindIt.DIT.service;

import FindIt.DIT.dto.AuthResponse;
import FindIt.DIT.dto.LoginRequest;
import FindIt.DIT.dto.RegisterRequest;
import FindIt.DIT.entity.User;
import FindIt.DIT.entity.ValidDitId;
import FindIt.DIT.enums.Role;
import FindIt.DIT.repository.UserRepository;
import FindIt.DIT.repository.ValidDitIdRepository;
import FindIt.DIT.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final ValidDitIdRepository validDitIdRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       ValidDitIdRepository validDitIdRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.validDitIdRepository = validDitIdRepository;
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

        ValidDitId validId = validDitIdRepository.findByDitId(request.getDitId())
                .orElseThrow(() -> new RuntimeException("DIT ID not recognized. Contact admin."));

        if (validId.isUsed()) {
            throw new RuntimeException("DIT ID already used for another account");
        }

        User user = new User(
                request.getDitId(),
                request.getFullName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                validId.getIdType() == Role.STAFF ? Role.STAFF : Role.STUDENT
        );
        user.setVerified(true);
        userRepository.save(user);

        validId.setUsed(true);
        validDitIdRepository.save(validId);

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