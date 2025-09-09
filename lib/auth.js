// lib/auth.js - Serviços de Autenticação
export const authService = {
  // Verificar se está logado
  isAuthenticated() {
    if (typeof window === 'undefined') return false;
    const user = localStorage.getItem('rotary_user');
    return !!user;
  },

  // Obter usuário atual
  getCurrentUser() {
    if (typeof window === 'undefined') return null;
    try {
      const user = localStorage.getItem('rotary_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  // Verificar se é admin
  isAdmin() {
    const user = this.getCurrentUser();
    return user?.email === 'cvcalessandro@gmail.com' || user?.nivel_acesso === 'admin';
  },

  // Logout
  logout() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('rotary_user');
    window.location.href = '/login';
  },

  // Login simulado
  async simulateLogin(userData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('rotary_user', JSON.stringify(userData));
        resolve(userData);
      }, 1000);
    });
  }
};

// HOC para proteger rotas
export const withAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = () => {
        if (authService.isAuthenticated()) {
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);
        } else {
          router.push('/login');
        }
        setLoading(false);
      };

      checkAuth();
    }, [router]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Verificando autenticação...</p>
          </div>
        </div>
      );
    }

    if (!user) {
      return null; // Redirecionando para login
    }

    return <WrappedComponent {...props} user={user} />;
  };
};
