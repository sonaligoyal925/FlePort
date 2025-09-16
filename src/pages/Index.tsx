import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Truck, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-dashboard">
      <div className="text-center max-w-2xl px-6">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary rounded-full shadow-glow">
            <Truck className="h-12 w-12 text-primary-foreground" />
          </div>
        </div>
        
        <h1 className="mb-6 text-5xl font-bold text-foreground">
          GAGO Fleet Management
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Professional fleet management solution for modern transportation businesses. 
          Track vehicles, manage drivers, optimize routes, and boost your operational efficiency.
        </p>
        
        <div className="space-y-4">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => navigate('/auth')}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Join thousands of fleet managers who trust GAGO
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
